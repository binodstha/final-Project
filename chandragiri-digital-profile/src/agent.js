import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import { isEmpty } from "lodash";
import { decode } from "geojson-polyline";

const superagent = superagentPromise(_superagent, global.Promise);
const responseBody = (res) => res.body;
const AuthParams = `client_id=${process.env.REACT_APP_PUBLIC_CLIENT_ID}&client_secret=${process.env.REACT_APP_PUBLIC_CLIENT_SECRET}&grant_type=${process.env.REACT_APP_PUBLIC_GRANT_TYPE}`;
const GisAuthParams = `client_id=${process.env.REACT_APP_GIS_PUBLIC_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIS_PUBLIC_CLIENT_SECRET}&grant_type=${process.env.REACT_APP_PUBLIC_GRANT_TYPE}`;
const BASE_API_URL = `${process.env.REACT_APP_SYSTEM_BASE_URL}/api/v1/`;
const BASE_GIS_API_URL = `${process.env.REACT_APP_GIS_SYSTEM_BASE_URL}/api/v1/`;

const checkError = (res) => {
  if (res.response.status === 401) {
    window.localStorage.setItem("isLoggedIn", false);
    profileLocalAuth();
  }
  return res.response.body;
};

const getAuthToken = () => {
  if (!isEmpty(JSON.parse(window.localStorage.getItem("authToken"))))
    return JSON.parse(window.localStorage.getItem("authToken"));
  else profileLocalAuth();
};

const profileLocalAuth = async () => {
  const authToken = await superagent
    .post(`${BASE_API_URL}generate-token`, AuthParams)
    .set("Content-Type", "application/x-www-form-urlencoded")
    .set("Accept", "application/json");
  if (authToken.status === 200) {
    window.localStorage.setItem("authToken", JSON.stringify(authToken.body));
    window.location.reload();
  }
};

const gisCheckError = (res) => {
  if (res.response.status === 401) {
    gisLocalAuth();
  }
  return res.response.body;
};

const getGisAuthToken = () => {
  if (!isEmpty(JSON.parse(window.localStorage.getItem("gisAuthToken"))))
    return JSON.parse(window.localStorage.getItem("gisAuthToken"));
  else gisLocalAuth();
};

const gisLocalAuth = async () => {
  const authToken = await superagent
    .post(`${BASE_GIS_API_URL}client-get-token`, GisAuthParams)
    .set("Content-Type", "application/x-www-form-urlencoded")
    .set("Accept", "application/json");
  if (authToken.status === 200) {
    window.localStorage.setItem("gisAuthToken", JSON.stringify(authToken.body));
    window.location.reload();
  }
};

const dataRequests = {
  get: (url) =>
    superagent
      .get(`${BASE_API_URL}${url}`)
      .set(
        "Authorization",
        `${getAuthToken().token_type} ${getAuthToken().access_token}`
      )
      .then(responseBody)
      .catch((err) => {
        throw err;
      }),
  post: (url, body) =>
    superagent
      .post(`${BASE_API_URL}${url}`, body)
      .set(
        "Authorization",
        `${getAuthToken().token_type} ${getAuthToken().access_token}`
      )
      .then(responseBody)
      .catch((err) => {
        throw err;
      }),
  put: (url, body) =>
    superagent
      .put(`${BASE_API_URL}${url}`, body)
      .set(
        "Authorization",
        `${getAuthToken().token_type} ${getAuthToken().access_token}`
      )
      .then(responseBody)
      .catch((err) => {
        throw err;
      }),
  delete: (url) =>
    superagent
      .del(`${BASE_API_URL}${url}`)
      .set(
        "Authorization",
        `${getAuthToken().token_type} ${getAuthToken().access_token}`
      )
      .then(responseBody)
      .catch((err) => {
        throw err;
      }),
};

const publicDigitalData = {
  tokenRefresh: () => profileLocalAuth(),
  getAboutApp: () =>
    dataRequests
      .get("about-apps")
      .then((response) => response.data)
      .catch((err) => checkError(err)),
  getBaseMap: () =>
    dataRequests
      .get("base-maps")
      .then((response) => response)
      .catch((err) => checkError(err)),
  getMunicipalityData: () =>
    dataRequests
      .get("get-municipality-data")
      .then((response) => {
        return {
          municipalityData: response.data.municipality_data,
          latestNotice: response.data.latest_notice,
        };
      })
      .catch((err) => checkError(err)),
  getMunicipalityChart: (pId = "") =>
    dataRequests
      .get(
        pId === "" ? `get-municipality-chart` : `get-municipality-chart/${pId}`
      )
      .then((response) => {
        return {
          municipalityStatistics: response.data.stats,
          buildingOwnership: response.data.building_ownership,
          buildingUsed: response.data.building_use,
          localProfile: response.data.local_profile,
        };
      })
      .catch((err) => checkError(err)),
  getCustomerServiceDashboard: () =>
    dataRequests
      .get("dashboard")
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getHomeSurvey: () =>
    dataRequests
      .get("home-survey")
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  putHomeSurvey: (data) =>
    dataRequests
      .put("home-survey", data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getInstitutionalInfo: () =>
    dataRequests
      .get("org-datasets")
      .then((response) => {
        return response.data.category;
      })
      .catch((err) => checkError(err)),
  getInstitutionalInfoData: (slug, id) =>
    dataRequests
      .get(`org-datasets/${slug}/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  postInstitutionalInfoData: (slug, data) =>
    dataRequests
      .post(`org-datasets/${slug}`, data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  putInstitutionalInfoData: (slug, id, data) =>
    dataRequests
      .put(`org-datasets/${slug}/${id}`, data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  delInstitutionalInfoData: (slug, id) =>
    dataRequests
      .delete(`org-datasets/${slug}/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getInstitutionalCatList: () =>
    dataRequests
      .get("org-category-lists")
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getInstitutionalDatasetAttribute: (slug) =>
    dataRequests
      .get(`org-dataset-attributes/${slug}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getComplainBox: (page = 1) =>
    dataRequests
      .get(`complain-box?page=${page}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getNotice: (page = 1, ward = false) =>
    dataRequests
      .get(`notices?page=${page}&my_ward=${ward}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getNoticeBySlug: (slug) =>
    dataRequests
      .get(`notices/${slug}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  addComplain: (body) =>
    dataRequests
      .post("complain-box", body)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getInstitutionalInformation: () =>
    dataRequests
      .get("institutional-information")
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getService: (page = 1) =>
    dataRequests
      .get(`service-type?page=${page}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  addService: (body) =>
    dataRequests
      .post("service-type", body)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getUserProfile: () =>
    dataRequests
      .get("auth-profile")
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getEditData: () =>
    dataRequests
      .get("get-edit-data")
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getUpdateRequestData: () =>
    dataRequests
      .get("get-update-request-data")
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getUpdatedRequestStatus: () =>
    dataRequests
      .get("update-is-viewed-status")
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),

  getEditConfigData: () =>
    dataRequests
      .get("get-config-data")
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getBanner: () =>
    dataRequests
      .get("banner")
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
};

const authUserRequests = {
  post: (url, body) =>
    superagent
      .post(`${BASE_API_URL}${url}`, body)
      .set(
        "Authorization",
        `${getAuthToken().token_type} ${getAuthToken().access_token}`
      )
      .catch((err) => {
        throw err;
      }),
  get: (url) =>
    superagent
      .get(`${BASE_API_URL}${url}`)
      .set(
        "Authorization",
        `${getAuthToken().token_type} ${getAuthToken().access_token}`
      )
      .catch((err) => {
        throw err;
      }),
  validateToken: (url) =>
    superagent
      .get(`${BASE_API_URL}${url}`)
      .set("token", `${getAuthToken().access_token}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      }),
};

const gisDataRequests = {
  get: (url) =>
    superagent
      .get(`${BASE_GIS_API_URL}${url}`)
      .set(
        "Authorization",
        `${getGisAuthToken().token_type} ${getGisAuthToken().access_token}`
      )
      .then(responseBody)
      .catch((err) => {
        throw err;
      }),
  post: (url, body) =>
    superagent
      .post(`${BASE_GIS_API_URL}${url}`, body)
      .set(
        "Authorization",
        `${getGisAuthToken().token_type} ${getGisAuthToken().access_token}`
      )
      .then(responseBody)
      .catch((err) => {
        throw err;
      }),
  put: (url, body) =>
    superagent
      .put(`${BASE_GIS_API_URL}${url}`, body)
      .set(
        "Authorization",
        `${getGisAuthToken().token_type} ${getGisAuthToken().access_token}`
      )
      .then(responseBody)
      .catch((err) => {
        throw err;
      }),
  delete: (url) =>
    superagent
      .del(`${BASE_GIS_API_URL}${url}`)
      .set(
        "Authorization",
        `${getGisAuthToken().token_type} ${getGisAuthToken().access_token}`
      )
      .then(responseBody)
      .catch((err) => {
        throw err;
      }),
};

const gisDigitalData = {
  getDatasetCatrgories: () =>
    gisDataRequests
      .get("chandragiri-dataset-categories")
      .then((response) => {
        return response.data;
      })
      .catch((err) => gisCheckError(err)),
  getDatasetSources: (slug) =>
    gisDataRequests
      .get(`chandragiri-dataset-sources/${slug}`)
      .then((response) => {
        let newDatasetSources = response.data.map((source) => {
          source.geojson = decode(source.geojson);
          return source;
        });
        return {
          dataset: response.dataset,
          geojson: newDatasetSources,
        };
      })
      .catch((err) => gisCheckError(err)),
  getAutoSuggestion: () =>
    gisDataRequests
      .get("digital-profile-dataset/auto-suggest")
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  getSearchData: (term, item) =>
    gisDataRequests
      .get(`digital-profile-dataset/search?term=${term}&item=${item}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  gisLocationByHn: (hn) =>
    gisDataRequests
      .get(`digital-profile-dataset/get-location-by-hn?hn=${hn}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
  gisLocationRoute: (source, dest) =>
    gisDataRequests
      .get(`digital-profile-dataset/route?source=${source}&destination=${dest}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => checkError(err)),
};

const AuthUser = {
  validateToken: () =>
    authUserRequests
      .validateToken("validate-token")
      .then(responseBody)
      .catch((err) => {
        throw err;
      }),
  login: (body) =>
    authUserRequests.post("auth/login", body).catch((err) => {
      throw err;
    }),
  register: (body) =>
    authUserRequests.post(`auth/register`, body).catch((err) => {
      throw err;
    }),
  otpVerify: (body) =>
    authUserRequests.post(`auth/verify-token`, body).catch((err) => {
      throw err;
    }),
  sendOtp: (body) =>
    authUserRequests.post(`send-otp`, body).catch((err) => {
      throw err;
    }),
  pnResetPassword: (body) =>
    authUserRequests.post(`reset-password`, body).catch((err) => {
      throw err;
    }),
  updateProfile: (body) =>
    authUserRequests.post(`update-profile`, body).catch((err) => {
      throw err;
    }),
  changePassword: (body) =>
    authUserRequests.post(`change-password`, body).catch((err) => {
      throw err;
    }),
  updateMobileNo: (body) =>
    authUserRequests.get(`change-mobile-number?${body}`).catch((err) => {
      throw err;
    }),
  confirmMobileOtp: (body) =>
    authUserRequests.post(`confirm-mobile-number`, body).catch((err) => {
      throw err;
    }),
  logout: () =>
    authUserRequests.get("logout").catch((err) => {
      throw err;
    }),
};

export default { AuthUser, publicDigitalData, gisDigitalData };

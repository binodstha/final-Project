import * as yup from "yup";

export const contactSchemaPersonal = yup.object().shape(
  {
    area_name: yup
      .string()
      .required("विवरण आवश्यक छ")
      .max(100, "100 वर्ण भन्दा बढी हुनु हुँदैन")
      .nullable(),
    street_name: yup
      .string()
      .max(100, "100 वर्ण भन्दा बढी हुनु हुँदैन")
      .nullable(),
    house_ownership: yup.string().required("विवरण आवश्यक छ").nullable(),
    more_than_one_family: yup.string().when("house_ownership", {
      is: (val) => val === "निजि / आफ्नै",
      then: yup.string().required("विवरण आवश्यक छ").nullable(),
      otherwise: yup.string().nullable(),
    }),

    number_of_families: yup.number().when("more_than_one_family", {
      is: (val) => val === "1",
      then: yup
        .number()
        .min(2, "2 भन्दा बढी वा बराबर हुनुपर्छ")
        .required("विवरण आवश्यक छ")
        .transform((value) => (isNaN(value) ? undefined : value)),
      otherwise: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .nullable(),
    }),
    house_owner_name: yup.string().when("house_ownership", {
      is: (val) => val === "संस्थागत",
      then: yup.string().required("विवरण आवश्यक छ").nullable(),
      otherwise: yup.string().nullable(),
    }),
    organizational_ownerships_type: yup.string().when("house_ownership", {
      is: (val) => val === "संस्थागत",
      then: yup.string().required("विवरण आवश्यक छ").nullable(),
      otherwise: yup.string().nullable(),
    }),
    if_other_house_ownership: yup.string().when("house_ownership", {
      is: (val) => val === "अन्य",
      then: yup.string().required("विवरण आवश्यक छ").nullable(),
      otherwise: yup.string().nullable(),
    }),

    use_of_building: yup.string().required("विवरण आवश्यक छ").nullable(),
    road_surface_type: yup.string().required("विवरण आवश्यक छ").nullable(),

    //Family detail
    family_head_name: yup.string().when("house_ownership", {
      is: (val) => val === "निजि / आफ्नै",
      then: yup
        .string()
        .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
        .required("विवरण आवश्यक छ")
        .nullable(),
      otherwise: yup.string().nullable(),
    }),

    family_head_name_en: yup.string().when("house_ownership", {
      is: (val) => val === "निजि / आफ्नै",
      then: yup
        .string()
        .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
        .required("विवरण आवश्यक छ")
        .nullable(),
      otherwise: yup.string().nullable(),
    }),
    fathers_name: yup
      .string()
      .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
      .nullable(),
    mothers_name: yup
      .string()
      .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
      .nullable(),
    grandfathers_name: yup
      .string()
      .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
      .nullable(),
    grandmothers_name: yup
      .string()
      .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
      .nullable(),

    phone_no: yup.number().when("house_ownership", {
      is: (val) => val === "निजि / आफ्नै",
      then: yup
        .number()
        .required("विवरण आवश्यक छ")
        .transform((value) => (isNaN(value) ? undefined : value)),
      otherwise: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value)),
    }),

    local_resident: yup.string().when("house_ownership", {
      is: (val) => val === "निजि / आफ्नै",
      then: yup.string().required("विवरण आवश्यक छ").nullable(),
      otherwise: yup.string().nullable(),
    }),
    shifted_from_district: yup.string().when("local_resident", {
      is: (val) => val === "0",
      then: yup.string().required("विवरण आवश्यक छ").nullable(),
      otherwise: yup.string().nullable(),
    }),
    shifted_date: yup.string().when("local_resident", {
      is: (val) => val === "0",
      then: yup.string().required("विवरण आवश्यक छ").nullable(),
      otherwise: yup.string().nullable(),
    }),

    living_persons_no: yup.number().when("house_ownership", {
      is: (val) =>
        [
          "भोग चलनमा रहेको तर स्थायी पुर्जा प्राप्त नभएको",
          "सार्वजनिक जग्गा / सुकुम्बासी",
        ].includes(val),
      then: yup
        .number()
        .required("विवरण आवश्यक छ")
        .transform((value) => (isNaN(value) ? undefined : value)),
      otherwise: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value)),
    }),
    member_detail: yup.array().of(
      yup.object().shape({
        first_name: yup
          .string()
          .required("विवरण आवश्यक छ")
          .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
          .nullable(),
        middle_name: yup
          .string()
          .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
          .nullable(),
        last_name: yup
          .string()
          .required("विवरण आवश्यक छ")
          .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
          .nullable(),
        name_en: yup
          .string()
          .required("विवरण आवश्यक छ")
          .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
          .nullable(),
        gender: yup
          .string()
          .required("विवरण आवश्यक छ")
          .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
          .nullable(),
        relation_with_house_owner: yup
          .string()
          .required("विवरण आवश्यक छ")
          .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
          .nullable(),
        blood_group: yup
          .string()
          .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
          .nullable(),
        mobile_number: yup
          .number()
          .nullable()
          .transform((value) => (isNaN(value) ? undefined : value)),
        email: yup.string().email().nullable(),
        dob: yup
          .string()
          .test({
            // unique name identifying the test
            name: "dob",
            // test function, determines schema validity
            test: (value) => {
              let d1 = new Date(value);
              let d2 = new Date(
                window.NepaliFunctions.ConvertDateFormat(
                  window.NepaliFunctions.GetCurrentBsDate()
                )
              );
              return d1.getTime() <= d2.getTime();
            },
            // the validation error message
            message: "मिति आज भन्दा कम वा बराबर हुनुपर्छ",
            // values passed to message for interpolation
          })
          .required("विवरण आवश्यक छ")
          .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
          .nullable(),
        age: yup
          .string()
          .required("विवरण आवश्यक छ")
          .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
          .nullable(),
        citizenship: yup.string().when("age", {
          is: (val) => val > 15,
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        citizenship_number: yup
          .string()
          .when("citizenship", {
            is: (val) => val === "1",
            then: yup.string().required("विवरण आवश्यक छ").nullable(),
            otherwise: yup.string().nullable(),
          })
          .max(50, "50 वर्ण भन्दा बढी हुनु हुँदैन")
          .nullable(),
        citizenship_issue_date: yup.string().when("citizenship", {
          is: (val) => val === "1",
          then: yup
            .string()
            .when("dob", (dob, schema) => {
              return schema.test({
                test: (citizenship_issue_date) => {
                  const diffDate = window.NepaliFunctions.BsDatesDiff(
                    window.NepaliFunctions.ConvertToDateObject(
                      dob,
                      "YYYY-MM-DD"
                    ),
                    window.NepaliFunctions.ConvertToDateObject(
                      citizenship_issue_date,
                      "YYYY-MM-DD"
                    )
                  );
                  return diffDate / 365 > 16;
                },
                message: "जारी मिति जन्म मिति भन्दा 16 वर्ष बढी हुनुपर्छ",
              });
            })
            .required("विवरण आवश्यक छ")
            .nullable(),
          otherwise: yup.string().nullable(),
        }),
        citizenship_issued_district: yup.string().when("citizenship", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        reason_if_no_citizenship: yup.string().when("citizenship", {
          is: (val) => val === "0",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        national_id_card: yup.string().when("age", {
          is: (val) => val > 15,
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        national_id_card_number: yup.string().when("national_id_card", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        national_id_card_issue_date: yup.string().when("national_id_card", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        passport: yup.string().when("age", {
          is: (val) => val > 15,
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        passport_number: yup.string().when("passport", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        passport_issue_place: yup.string().when("passport", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        passport_issue_date: yup.string().when("passport", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        passport_deadline_date: yup.string().when("passport", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        pan: yup.string().when("age", {
          is: (val) => val > 15,
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        pan_number: yup.string().when("pan", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        social_security_fund_id_card: yup.string().when("age", {
          is: (val) => val > 15,
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        social_security_fund_id_card_number: yup
          .string()
          .when("social_security_fund_id_card", {
            is: (val) => val === "1",
            then: yup.string().required("विवरण आवश्यक छ").nullable(),
            otherwise: yup.string().nullable(),
          }),

        driver_license: yup.string().when("age", {
          is: (val) => val > 15,
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        driver_license_number: yup.string().when("driver_license", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        driver_license_issue_date: yup.string().when("driver_license", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        driver_license_expiry_date: yup.string().when("driver_license", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        driver_license_category: yup.array().when("driver_license", {
          is: (val) => val === "1",
          then: yup
            .array()
            .min(1, "select at list one")
            .required("विवरण आवश्यक छ")
            .nullable(),
          otherwise: yup.array().nullable(),
        }),
        voters_id_card_number: yup.string().nullable(),
        voting_place: yup.string().nullable(),
        education_qualification: yup.string().when("age", {
          is: (val) => val > 10,
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        reason_for_leaving_school: yup
          .string()
          .when("education_qualification", {
            is: (val) => val === "1",
            then: yup.string().required("विवरण आवश्यक छ").nullable(),
            otherwise: yup.string().nullable(),
          }),
        faculty_of_study: yup.string().when("education_qualification", {
          is: (val) => ["5", "6", "7", "8", "9"].includes(val),
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        passed_date: yup.string().when("education_qualification", {
          is: (val) => ["2", "3", "4", "5", "6", "7", "8", "9"].includes(val),
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        qualification_assessment_type: yup
          .string()
          .when("education_qualification", {
            is: (val) => ["2", "3", "4", "5", "6", "7", "8", "9"].includes(val),
            then: yup.string().required("विवरण आवश्यक छ").nullable(),
            otherwise: yup.string().nullable(),
          }),
        scored_gpa_marks: yup.string().when("education_qualification", {
          is: (val) => ["2", "3", "4", "5", "6", "7", "8", "9"].includes(val),
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        studied_institution: yup.string().when("education_qualification", {
          is: (val) => ["2", "3", "4", "5", "6", "7", "8", "9"].includes(val),
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        marital_status: yup.string().when("age", {
          is: (val) => val > 10,
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        occupation: yup.string().when("age", {
          is: (val) => val > 10,
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        government_job_type: yup.string().when("occupation", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        government_job_post: yup.string().when("occupation", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        retired_or_reinstated: yup.string().when("occupation", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        post: yup.string().when("occupation", {
          is: (val) =>
            ["2", "3", "4", "5", "6", "10", "11", "12"].includes(val),
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        office: yup.string().when("occupation", {
          is: (val) =>
            ["2", "3", "4", "5", "6", "10", "11", "12"].includes(val),
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        work_experience_year: yup.number().when("occupation", {
          is: (val) =>
            ["2", "3", "4", "5", "6", "10", "11", "12"].includes(val),
          then: yup
            .number()
            .required("विवरण आवश्यक छ")
            .transform((value) => (isNaN(value) ? undefined : value)),
          otherwise: yup
            .number()
            .transform((value) => (isNaN(value) ? undefined : value)),
        }),
        if_living_in_other_part_of_country_local_level_name: yup
          .string()
          .when("residence_condition", {
            is: (val) => val === "स्वदेशमा अन्यत्र",
            then: yup.string().required("विवरण आवश्यक छ").nullable(),
            otherwise: yup.string().nullable(),
          }),
        for_living_in_other_place: yup.string().when("residence_condition", {
          is: (val) => val === "स्वदेशमा अन्यत्र",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),

        country_if_living_abroad: yup.string().when("residence_condition", {
          is: (val) => val === "विदेशमा",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        reason_for_going_abroad: yup.string().when("residence_condition", {
          is: (val) => val === "विदेशमा",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),

        subject_of_study: yup.string().when("reason_for_going_abroad", {
          is: (val) => val === "अध्ययन",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        which_employment: yup.string().when("reason_for_going_abroad", {
          is: (val) => val === "रोजगारी",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),

        foreign_employment_returned: yup.string().when("age", {
          is: (val) => val > 10,
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        foreign_employment_country: yup
          .string()
          .when("foreign_employment_returned", {
            is: (val) => val === "1",
            then: yup.string().required("विवरण आवश्यक छ").nullable(),
            otherwise: yup.string().nullable(),
          }),
        foreign_employment_occupation: yup
          .string()
          .when("foreign_employment_returned", {
            is: (val) => val === "1",
            then: yup.string().required("विवरण आवश्यक छ").nullable(),
            otherwise: yup.string().nullable(),
          }),
        work_period: yup.number().when("foreign_employment_returned", {
          is: (val) => val === "1",
          then: yup
            .number()
            .required("विवरण आवश्यक छ")
            .transform((value) => (isNaN(value) ? undefined : value)),
          otherwise: yup
            .number()
            .nullable()
            .transform((value) => (isNaN(value) ? undefined : value)),
        }),
        skill_training: yup.string().nullable(),
        training_period: yup.number().when("skill_training", {
          is: (val) => val !== "" && val !== null && val !== undefined,
          then: yup
            .number()
            .required("विवरण आवश्यक छ")
            .transform((value) => (isNaN(value) ? undefined : value)),
          otherwise: yup
            .number()
            .nullable()
            .transform((value) => (isNaN(value) ? undefined : value)),
        }),
        training_year: yup.string().when("skill_training", {
          is: (val) => val !== "" && val !== null && val !== undefined,
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        disability_condition: yup.string().nullable(),
        health_condition: yup.string().required("विवरण आवश्यक छ").nullable(),
        disease_name: yup.string().when("health_condition", {
          is: (val) => val === "दीर्घ रोगी",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        infected_by_epidemic: yup
          .string()
          .required("विवरण आवश्यक छ")
          .nullable(),
        epidemic_name: yup.string().when("infected_by_epidemic", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        infected_date: yup.string().when("infected_by_epidemic", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        observed_symptoms: yup.string().when("infected_by_epidemic", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        living_place_after_infection: yup
          .string()
          .when("infected_by_epidemic", {
            is: (val) => val === "1",
            then: yup.string().required("विवरण आवश्यक छ").nullable(),
            otherwise: yup.string().nullable(),
          }),
        treatment_room: yup.string().when("living_place_after_infection", {
          is: (val) => val === "अस्पताल",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        hospital_discharged_in_how_many_days: yup
          .number()
          .when("living_place_after_infection", {
            is: (val) => val === "अस्पताल",
            then: yup
              .number()
              .required("विवरण आवश्यक छ")
              .transform((value) => (isNaN(value) ? undefined : value)),
            otherwise: yup
              .number()
              .nullable()
              .transform((value) => (isNaN(value) ? undefined : value)),
          }),
        oxygen_support_needed_for_treatment: yup
          .string()
          .when("infected_by_epidemic", {
            is: (val) => val === "1",
            then: yup.string().required("विवरण आवश्यक छ").nullable(),
            otherwise: yup.string().nullable(),
          }),

        vaccine_against_covid: yup
          .string()
          .required("विवरण आवश्यक छ")
          .nullable(),
        which_dose: yup.string().when("vaccine_against_covid", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        vaccine_name: yup.string().when("vaccine_against_covid", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        health_insurance: yup.string().required("विवरण आवश्यक छ").nullable(),
        is_bank_account_exist: yup
          .string()
          .required("विवरण आवश्यक छ")
          .nullable(),
        bank_institution_name: yup.string().when("is_bank_account_exist", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),

        death_status: yup.string().nullable(),
        age_when_death: yup.number().when("death_status", {
          is: (val) => val === "1",
          then: yup
          .number()
          .required("विवरण आवश्यक छ")
          .transform((value) => (isNaN(value) ? undefined : value)),
        otherwise: yup
          .number()
          .nullable()
          .transform((value) => (isNaN(value) ? undefined : value)),
        }),
        death_reason: yup.string().when("death_status", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        death_disease: yup.string().when("death_status", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        death_certificate: yup.string().when("death_status", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        is_pregnant_woman: yup.string().when("death_status", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
        is_infant_child: yup.string().when("death_status", {
          is: (val) => val === "1",
          then: yup.string().required("विवरण आवश्यक छ").nullable(),
          otherwise: yup.string().nullable(),
        }),
      })
    ),

    //Death Member
    death_member_in_last_1_year: yup
      .string()
      .required("विवरण आवश्यक छ")
      .nullable(),

    death_detail: yup.array().when("death_member_in_last_1_year", {
      is: (val) => val === "1",
      then: yup.array().of(
        yup.object().shape({
          first_name: yup.string().required("विवरण आवश्यक छ").nullable(),
          last_name: yup.string().required("विवरण आवश्यक छ").nullable(),
          relation_with_family_head: yup
            .string()
            .required("विवरण आवश्यक छ")
            .nullable(),
          gender: yup.string().required("विवरण आवश्यक छ").nullable(),
          age_when_death: yup
            .number()
            .required("विवरण आवश्यक छ")
            .transform((value) => (isNaN(value) ? undefined : value)),
          death_certificate: yup.string().required("विवरण आवश्यक छ").nullable(),
          is_pregnant_woman: yup.string().required("विवरण आवश्यक छ").nullable(),
          is_infant_child: yup.string().required("विवरण आवश्यक छ").nullable(),
          death_status: yup.string().nullable(),
        })
      ),
    }),

    //HealthRelated
    vaccine_type: yup
      .string()
      .when("child_below_5_years_vaccinated_by_bcg_dpt_measles_vaccine", {
        is: (val) => val === "छ",
        then: yup.string().required("विवरण आवश्यक छ").nullable(),
        otherwise: yup.string().nullable(),
      }),

    //Agriculture
    used_land_for_agriculture: yup
      .string()
      .required("विवरण आवश्यक छ")
      .nullable(),
    land_in_family_name: yup
      .number()
      .when(["used_land_for_agriculture", "land_in_family_name_aana"], {
        is: (check, value) => check === "1" && (isNaN(value) || value === 0),
        then: yup
          .number()
          .moreThan(0, "0 भन्दा बढी हुनुपर्छ")
          .required("विवरण आवश्यक छ")
          .transform((value) => (isNaN(value) ? undefined : value)),
        otherwise: yup
          .number()
          .nullable()
          .transform((value) => (isNaN(value) ? undefined : value)),
      }),
    land_in_family_name_aana: yup
      .number()
      .when(["used_land_for_agriculture", "land_in_family_name"], {
        is: (check, value) => check === "1" && (isNaN(value) || value === 0),
        then: yup
          .number()
          .moreThan(0, "0 भन्दा बढी हुनुपर्छ")
          .required("विवरण आवश्यक छ")
          .transform((value) => (isNaN(value) ? undefined : value)),
        otherwise: yup
          .number()
          .nullable()
          .transform((value) => (isNaN(value) ? undefined : value)),
      }),
    land_with_other_people_ownership: yup
      .string()
      .when("used_land_for_agriculture", {
        is: (val) => val === "1",
        then: yup.string().required("विवरण आवश्यक छ").nullable(),
        otherwise: yup.string().nullable(),
      }),
    land_in_other_person_name: yup
      .number()
      .when(
        ["land_with_other_people_ownership", "land_in_other_person_name_aana"],
        {
          is: (check, value) => check === "1" && (isNaN(value) || value === 0),
          then: yup
            .number()
            .moreThan(0, "0 भन्दा बढी हुनुपर्छ")
            .required("विवरण आवश्यक छ")
            .transform((value) => (isNaN(value) ? undefined : value)),
          otherwise: yup
            .number()
            .nullable()
            .transform((value) => (isNaN(value) ? undefined : value)),
        }
      ),
    land_in_other_person_name_aana: yup
      .number()
      .when(["land_with_other_people_ownership", "land_in_other_person_name"], {
        is: (check, value) => check === "1" && (isNaN(value) || value === 0),
        then: yup
          .number()
          .moreThan(0, "0 भन्दा बढी हुनुपर्छ")
          .required("विवरण आवश्यक छ")
          .transform((value) => (isNaN(value) ? undefined : value)),
        otherwise: yup
          .number()
          .nullable()
          .transform((value) => (isNaN(value) ? undefined : value)),
      }),
    how_much_land_has_irrigation_facility: yup
      .number()
      .when("irrigation_facility_available", {
        is: (val) => val === "1",
        then: yup
          .number()
          .required("विवरण आवश्यक छ")
          .transform((value) => (isNaN(value) ? undefined : value)),
        otherwise: yup
          .number()
          .nullable()
          .transform((value) => (isNaN(value) ? undefined : value)),
      }),

    //Farming
    quadruped_and_livestock_farming: yup
      .string()
      .required("विवरण आवश्यक छ")
      .nullable(),
    if_fish_bee_silk_rearing_done: yup
      .string()
      .required("विवरण आवश्यक छ")
      .nullable(),
    pond_area: yup.number().when("if_fish_bee_silk_rearing_done", {
      is: (val) => val === "1",
      then: yup
        .number()
        .required("विवरण आवश्यक छ")
        .transform((value) => (isNaN(value) ? undefined : value)),
      otherwise: yup
        .number()
        .nullable()
        .transform((value) => (isNaN(value) ? undefined : value)),
    }),

    //HouseRelated
    disaster_name: yup
      .string()
      .when("family_affected_by_disaster_in_last_1_year", {
        is: (val) => val === "1",
        then: yup.string().required("विवरण आवश्यक छ").nullable(),
        otherwise: yup.string().nullable(),
      }),
    estimated_destruction: yup
      .number()
      .when("family_affected_by_disaster_in_last_1_year", {
        is: (val) => val === "1",
        then: yup
          .number()
          .required("विवरण आवश्यक छ")
          .transform((value) => (isNaN(value) ? undefined : value)),
        otherwise: yup
          .number()
          .nullable()
          .transform((value) => (isNaN(value) ? undefined : value)),
      }),
    taxpayer_details: yup.string().when("registered_as_taxpayer", {
      is: (val) => val === "1",
      then: yup.string().required("विवरण आवश्यक छ").nullable(),
      otherwise: yup.string().nullable(),
    }),
    male_members: yup.number().when("is_house_room_rented", {
      is: (val) => val === "1",
      then: yup
        .number()
        .required("विवरण आवश्यक छ")
        .transform((value) => (isNaN(value) ? undefined : value)),
      otherwise: yup
        .number()
        .nullable()
        .transform((value) => (isNaN(value) ? undefined : value)),
    }),
    female_members: yup.number().when("is_house_room_rented", {
      is: (val) => val === "1",
      then: yup
        .number()
        .required("विवरण आवश्यक छ")
        .transform((value) => (isNaN(value) ? undefined : value)),
      otherwise: yup
        .number()
        .nullable()
        .transform((value) => (isNaN(value) ? undefined : value)),
    }),
    rented_by: yup.string().when("is_house_room_rented", {
      is: (val) => val === "1",
      then: yup.string().required("विवरण आवश्यक छ").nullable(),
      otherwise: yup.string().nullable(),
    }),
    used_for: yup.string().when("is_house_room_rented", {
      is: (val) => val === "1",
      then: yup.string().required("विवरण आवश्यक छ").nullable(),
      otherwise: yup.string().nullable(),
    }),
    number_of_rooms: yup.number().when("is_house_room_rented", {
      is: (val) => val === "1",
      then: yup
        .number()
        .required("विवरण आवश्यक छ")
        .transform((value) => (isNaN(value) ? undefined : value)),
      otherwise: yup
        .number()
        .nullable()
        .transform((value) => (isNaN(value) ? undefined : value)),
    }),
    agreement_period: yup.number().when("is_house_room_rented", {
      is: (val) => val === "1",
      then: yup
        .number()
        .required("विवरण आवश्यक छ")
        .transform((value) => (isNaN(value) ? undefined : value)),
      otherwise: yup
        .number()
        .nullable()
        .transform((value) => (isNaN(value) ? undefined : value)),
    }),
    start_date: yup.string().when("is_house_room_rented", {
      is: (val) => val === "1",
      then: yup.string().required("विवरण आवश्यक छ").nullable(),
      otherwise: yup.string().nullable(),
    }),
    rent_period: yup.number().when("is_house_room_rented", {
      is: (val) => val === "1",
      then: yup
        .number()
        .required("विवरण आवश्यक छ")
        .transform((value) => (isNaN(value) ? undefined : value)),
      otherwise: yup
        .number()
        .nullable()
        .transform((value) => (isNaN(value) ? undefined : value)),
    }),
    rent_money_monthly: yup.number().when("is_house_room_rented", {
      is: (val) => val === "1",
      then: yup
        .number()
        .required("विवरण आवश्यक छ")
        .transform((value) => (isNaN(value) ? undefined : value)),
      otherwise: yup
        .number()
        .nullable()
        .transform((value) => (isNaN(value) ? undefined : value)),
    }),

    //Facilities
    water_purification_before_drinking: yup.string().nullable(),
    purification_method: yup
      .string()
      .when("water_purification_before_drinking", {
        is: (val) => val === "1",
        then: yup.string().required("विवरण आवश्यक छ").nullable(),
        otherwise: yup.string().nullable(),
      }),
    electricity_meter_connected_in_home: yup
      .string()
      .when("electricity_main_source", {
        is: (val) => val === "बिधुत / बिजुली",
        then: yup.string().required("विवरण आवश्यक छ").nullable(),
        otherwise: yup.string().nullable(),
      }),
    not_using_electricity_reason: yup.string().when("electricity_main_source", {
      is: (val) =>
        ["मट्टीतेल", "वायो ग्यास / गोबर ग्यास", "सोलार", "अन्य"].includes(val),
      then: yup.string().required("विवरण आवश्यक छ").nullable(),
      otherwise: yup.string().nullable(),
    }),

    if_no_drainage_system_how_to_manage_waste: yup
      .array()
      .when("drainage_management", {
        is: (val) => val === "ढल छैन",
        then: yup.array().required("विवरण आवश्यक छ").nullable(),
        otherwise: yup.array().nullable(),
      }),
  },
  [
    ["land_in_family_name_aana", "land_in_family_name"],
    ["land_in_other_person_name", "land_in_other_person_name_aana"],
  ]
);

export const contactSchemaOrg = yup.object().shape({
  area_name: yup
    .string()
    .required("विवरण आवश्यक छ")
    .max(100, "100 वर्ण भन्दा बढी हुनु हुँदैन")
    .nullable(),
  street_name: yup
    .string()
    .max(100, "100 वर्ण भन्दा बढी हुनु हुँदैन")
    .nullable(),
  house_ownership: yup.string().required("विवरण आवश्यक छ").nullable(),

  house_owner_name: yup.string().when("house_ownership", {
    is: (val) => val === "संस्थागत",
    then: yup.string().required("विवरण आवश्यक छ").nullable(),
    otherwise: yup.string().nullable(),
  }),
  organizational_ownerships_type: yup.string().when("house_ownership", {
    is: (val) => val === "संस्थागत",
    then: yup.string().required("विवरण आवश्यक छ").nullable(),
    otherwise: yup.string().nullable(),
  }),
  if_other_house_ownership: yup.string().when("house_ownership", {
    is: (val) => val === "अन्य",
    then: yup.string().required("विवरण आवश्यक छ").nullable(),
    otherwise: yup.string().nullable(),
  }),
  use_of_building: yup.string().required("विवरण आवश्यक छ").nullable(),
  road_surface_type: yup.string().required("विवरण आवश्यक छ").nullable(),
});

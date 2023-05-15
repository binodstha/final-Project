#!/bin/bash
if [ "$1" == "dev" ]
then
REACT_APP_SYSTEM_BASE_URL=https://dev-chandragiri-data.ekbana.info
REACT_APP_SYSTEM_DIGITAL_PROFILE_URL=https://dev-report.chandragiri.pointnemo.info
REACT_APP_GIS_SYSTEM_BASE_URL=https://system.dev-chandragiri.pointnemo.info
REACT_APP_GIS_ANALYSIS_BASE_URL=https://dev-chandragiri.pointnemo.info/

REACT_APP_PUBLIC_CLIENT_ID=95fb7a7b-5e31-4191-85bd-1a199c538b9c
REACT_APP_PUBLIC_CLIENT_SECRET=brL0lO48n5mdmWADKXfBdLxoFYolzZ6iKYebOdmF

REACT_APP_PRIVATE_CLIENT_ID=95e3271b-318d-4324-9c4a-fa6df8bfcf1f
REACT_APP_PRIVATE_CLIENT_SECRET=mWbdocEwQiIp3F6KXioI9aDDLiYTurufE7B6GyPg

REACT_APP_GIS_PUBLIC_CLIENT_ID=964ff445-704a-4a87-a42e-2adda240ed8c
REACT_APP_GIS_PUBLIC_CLIENT_SECRET=9rjAk5QGhlKmFvof0Ltofo59zSWVyqGkp6N9uyVr
yarn build
rsync -avzP -e "ssh -p 3030" build/* root@157.230.244.78:/var/www/chandragiri-profile/dev
elif [ "$1" == "prod" ]
then
REACT_APP_SYSTEM_BASE_URL=https://admin.chandragiriprofile.com
REACT_APP_SYSTEM_DIGITAL_PROFILE_URL=https://report.chandragiriprofile.com
REACT_APP_GIS_SYSTEM_BASE_URL=https://system.chandragiriprofile.com
REACT_APP_GIS_ANALYSIS_BASE_URL=https://gis.chandragiriprofile.com

REACT_APP_PUBLIC_CLIENT_ID=960312ed-1a46-4ebb-85d6-994c09da5448
REACT_APP_PUBLIC_CLIENT_SECRET=E4xNEMlMDAYtCWe8Vz6lmCKha8WSbBcBwidCq5hy

REACT_APP_PRIVATE_CLIENT_ID=960312d9-fe4d-423a-abfd-63b76d37d61e
REACT_APP_PRIVATE_CLIENT_SECRET=pBUfSgXWFPDRE1zEPeBmUb9VBVkkjLZVB2oNtR3v

REACT_APP_GIS_PUBLIC_CLIENT_ID=95487c5d-759d-4243-b25e-a28217286c9e
REACT_APP_GIS_PUBLIC_CLIENT_SECRET=TJySNDhkQZDp9yoheJfBio5HDoJb2LRFlpNRO7UQ
yarn build
rsync -avzP -e "ssh -p 3030" build/* root@209.97.163.225:/var/www/chandragiri-profile/uat
fi

REACT_APP_PUBLIC_GRANT_TYPE=client_credentials
REACT_APP_PRIVATE_GRANT_TYPE=password
REACT_APP_MAX_FILE_UPLOAD_SIZE=5242880
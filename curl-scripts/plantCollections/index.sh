API="http://localhost:4741"
URL_PATH="/plantCollections"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "plantCollection": {
      "owner": "'"${OWNER}"'"
    }
  }'

  echo

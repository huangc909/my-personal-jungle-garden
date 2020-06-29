API="http://localhost:4741"
URL_PATH="/plantCollections"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "plantCollection": {
      "name": "'"${NAME}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

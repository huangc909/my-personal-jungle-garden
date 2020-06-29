API="http://localhost:4741"
URL_PATH="/plantCollections"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "plantCollection": {
      "name": "'"${NAME}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

echo

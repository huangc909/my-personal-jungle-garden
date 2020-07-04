API="http://localhost:4741"
URL_PATH="/plants"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "plant": {
      "owner": "'"${OWNER}"'"
    }
  }'

echo
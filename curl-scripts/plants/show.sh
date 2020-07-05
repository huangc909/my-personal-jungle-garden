API="http://localhost:4741"
URL_PATH="/plantCollections/${PC_ID}/plants/${ID}"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "plant": {
      "owner": "'"${OWNER}"'"
    }
  }'

echo

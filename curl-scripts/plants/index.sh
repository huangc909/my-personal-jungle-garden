API="http://localhost:4741"
URL_PATH="/plantCollections/${PC_ID}/plants"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "plant": {
      "plantCollectionId": "'"${PC_ID}"'"
    }
  }'
echo

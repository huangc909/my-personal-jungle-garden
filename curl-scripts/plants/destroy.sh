API="http://localhost:4741"
URL_PATH="/plants"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "plant": {
      "plantCollectionId": "'"${PC_ID}"'"
    }
  }'

echo

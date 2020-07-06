API="http://localhost:4741"
URL_PATH="/plants"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "plant": {
      "name": "'"${NAME}"'",
      "nickName": "'"${NICKNAME}"'",
      "dateAcquired": "'"${DATEACQ}"'",
      "additionalNotes": "'"${NOTES}"'",
      "log": "'"${LOG}"'",
      "plantCollectionId": "'"${PC_ID}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

echo

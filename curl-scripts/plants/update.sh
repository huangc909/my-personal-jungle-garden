API="http://localhost:4741"
URL_PATH="/plantCollections/${PC_ID}/plants/${ID}"

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "plant": {
      "name": "'"${NAME}"'",
      "nickName": "'"${NICKNAME}"'",
      "dateAcquired": "'"${DATEACQ}"'",
      "additionalNotes": "'"${NOTES}"'",
      "log": "'"${LOG}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

echo

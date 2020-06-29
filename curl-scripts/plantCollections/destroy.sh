API="http://localhost:4741"
URL_PATH="/plantCollections/${ID}"

curl "${API}${URL_PATH}" \
  --include \
  --request DELETE \

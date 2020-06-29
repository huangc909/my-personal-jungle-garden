API="http://localhost:4741"
URL_PATH="/plantCollections"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "plantCollection": {
      "name": "'"${NAME}"'"
    }
  }'

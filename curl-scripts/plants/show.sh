API="http://localhost:4741"
URL_PATH="/plantCollections/${PC_ID}/plants/${PLANT_ID}"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}" \


echo

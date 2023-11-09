rm -rf popup
cd popupUI
command npm run build
cd ../
command git add .
command git status

if [[ $1 = "" ]]; then
  echo "First arg not found"
  exit
fi

if [[ $2 = "" ]]; then
  echo "Second arg not found"
  exit
fi

command git commit -m "$1"
echo "Commit named $1"
git push origin "$2"
echo "Good push into branch - $2"
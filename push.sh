rm -rf popup
cd popupUI
command npm run build
cd ../
command git add .
command git status

if [$1 == ""]
then
    echo "Hello"
else 
    echo "Error"
    exit 0 
fi

    # command git commit -m `$1`
    # echo "commit" + $1
    # command git log
    # git push origin $2
    # echo "Good push"
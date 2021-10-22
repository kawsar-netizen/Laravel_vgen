<p align="center">

## Instructions and dependencies Vgen

</p>

### important git command

    git add .
    git commit -m "YOUR MESSAGE"
    git pull
    git push
    git branch <YOURBRANCH>
    git branch
    git status
    git checkout <YOURBRANCH>
    git merge main
    git stash
    git revert

### first copy _ env.example _ to .env

To setup in local environment follow followings

    php artisan key:generate
    php artisan migrate

### packages to install

    composer require doctrine/dbal
    composer require laravel/passport
    composer require laravel/socialite

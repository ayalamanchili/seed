## Dev

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## prod deploy
ng build --prod --base-href /portal-web/

## docker 
#build 
docker build -t portal/portal-web docker
#run
docker run -p 8080:80 portal/portal-web

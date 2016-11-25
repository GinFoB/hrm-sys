var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');

    mix.scripts(['app.js','public/js/app.js']);

    mix.scripts(['controllers/_common.js'],'public/js/_common.js');
    mix.scripts(['controllers/home.js'],'public/js/home.js');
    mix.scripts(['controllers/factureRetatCtrl.js'],'public/js/factureRetatCtrl.js');
    mix.scripts(['controllers/factureEnCtrl.js'],'public/js/factureEnCtrl.js');
    mix.scripts(['controllers/PrestationRetCtrl.js'],'public/js/PrestationRetCtrl.js');
    mix.scripts(['controllers/PrestationPayCtrl.js'],'public/js/PrestationPayCtrl.js');
    mix.scripts(['controllers/ClientCtrl.js'],'public/js/ClientCtrl.js');
    mix.scripts(['controllers/AdminCtrl.js'],'public/js/AdminCtrl.js');
    mix.scripts(['controllers/ConsultantCtrl.js'],'public/js/ConsultantCtrl.js');
    mix.scripts(['controllers/MissionCtrl.js'],'public/js/MissionCtrl.js');
    mix.scripts(['controllers/CaisseCtrl.js'],'public/js/CaisseCtrl.js');
    mix.scripts(['controllers/PrestationCtrl.js'],'public/js/PrestationCtrl.js');

    mix.scripts(['services/ClientService.js'],'public/js/ClientService.js');
    mix.scripts(['services/ConsultantService.js'],'public/js/ConsultantService.js');
    mix.scripts(['services/MissionService.js'],'public/js/MissionService.js');
    mix.scripts(['services/CaisseService.js'],'public/js/CaisseService.js');
    mix.scripts(['services/PrestationService.js'],'public/js/PrestationService.js');

    mix.scripts(['directives/appFilereader.js'],'public/js/appFilereader.js');
    mix.scripts(['directives/matchValidator.js'],'public/js/matchValidator.js');


});

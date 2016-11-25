<!doctype html>
<html ng-app="hrmApp" lang="en">
<head>
  {{--  <link rel="stylesheet" href="{{asset('https://shrm.herokuapp.com/bower_components/angular-material/angular-material.min.css')}}">
    <link rel="stylesheet" href="{{asset('https://shrm.herokuapp.com/bower_components/angular-material-sidenav/angular-material-sidenav.css')}}">
    <link rel="stylesheet" href="{{asset('https://shrm.herokuapp.com/bower_components/font-awesome/css/font-awesome.css')}}">

    <link rel="stylesheet" href="{{asset('https://shrm.herokuapp.com/bower_components/angular-material-data-table/dist/md-data-table.min.css')}}">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">--}}


     <link rel="stylesheet" href="{{asset('bower_components/angular-material/angular-material.min.css')}}">
     <link rel="stylesheet" href="{{asset('bower_components/angular-material-sidenav/angular-material-sidenav.css')}}">
     <link rel="stylesheet" href="{{asset('bower_components/font-awesome/css/font-awesome.css')}}">
     <link rel="stylesheet" href="{{asset('bower_components/angular-material-data-table/dist/md-data-table.min.css')}}">
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
           rel="stylesheet">

    <style>
        body,
        body > div {
            max-width: 100%;
            max-height: 100%;
            overflow: hidden;
        }

        body > div {
            height: 100%;
        }

        .nav-header {
            flex-shrink: 0;
            z-index: 2;
        }

        .nav-header h1,
        .nav-header h4 {
            color: white;
            text-align: center;
        }

        .nav-header a.logo {
            text-decoration: none;
        }
    </style>

    <style>
        #custom input[name="autocompleteField"]  {
            background: url(http://glamourshots-albums.com/assets/themes/default/images/search.icon.png);
            background-repeat: no-repeat;
            background-position: 5px 7px;
            padding: 0px 35px;
        }
    </style>

    <style>
        .datepickerdemoBasicUsage {
            /** Demo styles for mdCalendar. */ }
        .datepickerdemoBasicUsage md-content {
            padding-bottom: 200px; }
        .datepickerdemoBasicUsage .validation-messages {
            font-size: 12px;
            color: #dd2c00;
            margin-left: 15px; }
    </style>

    <style>
        .buttondemoBasicUsage section {
            background: #f7f7f7;
            border-radius: 3px;
            text-align: center;
            margin: 1em;
            position: relative !important;
            padding-bottom: 10px; }
        .buttondemoBasicUsage md-content {
            margin-right: 7px; }
        .buttondemoBasicUsage section .md-button {
            margin-top: 16px;
            margin-bottom: 16px; }
        .buttondemoBasicUsage .label {
            position: absolute;
            bottom: 5px;
            left: 7px;
            font-size: 14px;
            opacity: 0.54; }
    </style>

    <style>
        .tabsdemoDynamicHeight md-content {
            background-color: transparent !important; }
        .tabsdemoDynamicHeight md-content md-tabs {
            background: #f6f6f6;
            border: 1px solid #e1e1e1; }
        .tabsdemoDynamicHeight md-content md-tabs md-tabs-wrapper {
            background: white; }
        .tabsdemoDynamicHeight md-content h1:first-child {
            margin-top: 0; }
    </style>

</head>
<body>

<div  ui-view layout="row" flex></div>
{{--

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min.js"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/angular-resource/angular-resource.min.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/angular-animate/angular-animate.min.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/angular-aria/angular-aria.min.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/angular-messages/angular-messages.min.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/angular-material/angular-material.min.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/angular-route/angular-route.min.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/angular-cookies/angular-cookies.min.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/angular-ui-router/release/angular-ui-router.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/angular-material-sidenav/angular-material-sidenav.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/angular-ui-router/release/angular-ui-router.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/angular-material-data-table/dist/md-data-table.min.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/ngstorage/ngStorage.min.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/satellizer/dist/satellizer.min.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/bower_components/ng-file-upload/ng-file-upload.min.js')}}"></script>
--}}


<script type="text/javascript" src="{{asset('bower_components/angular/angular.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-resource/angular-resource.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-animate/angular-animate.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-aria/angular-aria.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-messages/angular-messages.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-material/angular-material.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-cookies/angular-cookies.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-route/angular-route.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-material-sidenav/angular-material-sidenav.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-ui-router/release/angular-ui-router.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-material-data-table/dist/md-data-table.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/ngstorage/ngStorage.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/satellizer/dist/satellizer.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/ng-file-upload/ng-file-upload.min.js')}}"></script>


<script type="text/javascript" src="{{asset('js/all.js')}}"></script>
<script type="text/javascript" src="{{asset('js/_common.js')}}"></script>
<script type="text/javascript" src="{{asset('js/home.js')}}"></script>
<script type="text/javascript" src="{{asset('js/factureRetatCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('js/factureEnCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('js/PrestationRetCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('js/PrestationPayCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('js/ClientCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('js/AdminCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('js/ConsultantCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('js/MissionCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('js/CaisseCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('js/PrestationCtrl.js')}}"></script>


<script type="text/javascript" src="{{asset('js/ClientService.js')}}"></script>
<script type="text/javascript" src="{{asset('js/ConsultantService.js')}}"></script>
<script type="text/javascript" src="{{asset('js/MissionService.js')}}"></script>
<script type="text/javascript" src="{{asset('js/CaisseService.js')}}"></script>
<script type="text/javascript" src="{{asset('js/PrestationService.js')}}"></script>

{{--

<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/app.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/_common.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/home.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/factureRetatCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/factureEnCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/PrestationRetCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/PrestationPayCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/ClientCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/AdminCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/ConsultantCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/MissionCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/CaisseCtrl.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/PrestationCtrl.js')}}"></script>

<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/ClientService.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/ConsultantService.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/MissionService.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/CaisseService.js')}}"></script>
<script type="text/javascript" src="{{asset('https://shrm.herokuapp.com/js/PrestationService.js')}}"></script>--}}

</body>
</html>
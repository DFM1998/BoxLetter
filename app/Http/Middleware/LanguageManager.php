<?php

    namespace App\Http\Middleware;
    use Closure;
    use App;

    class LanguageManager
    {
        /**
         * Handle an incoming request.
         *
         * @param  \Illuminate\Http\Request  $request
         * @param  \Closure  $next
         * @return mixed
         */

        public function handle($request, Closure $next)
        {

            /*if (session()->has('locale')) {
                App::setLocale(session()->get('locale'));
            }*/
            app()->setLocale($request->segment(1));
            return $next($request);
        }
    }
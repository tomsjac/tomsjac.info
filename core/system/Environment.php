<?php

namespace Core\system;

use Symfony\Component\HttpFoundation\Request;

/**
 * Environment
 * Variables d'environnement pour la requête HTTP actuelle.
 *
 * @author Thomas
 * @version 1.1.0
 */
class Environment
{
    /**
     * Object Request
     * @var Symfony\Component\HttpFoundation\Request
     */
    private $request = null;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->request = Request::createFromGlobals();
    }

    
    /**
     * Retourne l'objet \Symfony\Component\HttpFoundation\Request
     * @return \Symfony\Component\HttpFoundation\Request
     */
    public function getObjRequest()
    {
       return $this->request;
    }

    /**
     * Retourne les infos serveurs modifiés
     * @return Array
     */
    public function getServer()
    {
        return $this->getProcessDataServer();
    }

    /**
     * Retourne les infos POST
     * @return Array
     */
    public function getPost()
    {
       return $this->request->query->all();
    }

    /**
     * Retourne les infos GET
     * @return Array
     */
    public function getQuery()
    {
        return $this->request->request->all();
    }
    
    
    /**
     * Génére les variables d'environnements
     * @return array  retourne les variables d'environnements
     */
    private function getProcessDataServer()
    {
         $env = array();

        //The HTTP request method
        $env['REQUEST_METHOD'] = $this->request->server->get('REQUEST_METHOD');

        //The IP
        $env['REMOTE_ADDR'] = $this->request->server->get('REMOTE_ADDR');

        /**
         * Application paths
         *
         * This derives two paths: SCRIPT_NAME and PATH_INFO. The SCRIPT_NAME
         * is the real, physical path to the application, be it in the root
         * directory or a subdirectory of the public document root. The PATH_INFO is the
         * virtual path to the requested resource within the application context.
         *
         * With htaccess, the SCRIPT_NAME will be an absolute path (without file name);
         * if not using htaccess, it will also include the file name. If it is "/",
         * it is set to an empty string (since it cannot have a trailing slash).
         *
         * The PATH_INFO will be an absolute path with a leading slash; this will be
         * used for application routing.
         */
        if (strpos($this->request->server->get('REQUEST_URI'), $this->request->server->get('SCRIPT_NAME')) === 0) {
            $env['SCRIPT_NAME'] = $this->request->server->get('SCRIPT_NAME'); //Without URL rewrite
        } else {
            $env['SCRIPT_NAME'] = str_replace('\\', '/', dirname($this->request->server->get('SCRIPT_NAME'))); //With URL rewrite
        }
        $env['SCRIPT_NAME'] = rtrim($env['SCRIPT_NAME'], '/');

        $env['PATH_INFO'] = substr_replace(
            $this->request->server->get('REQUEST_URI'), '', 0, strlen($env['SCRIPT_NAME'])
        );
        if (strpos($env['PATH_INFO'], '?') !== false) {
            $env['PATH_INFO'] = substr_replace($env['PATH_INFO'], '', strpos($env['PATH_INFO'], '?')); //query string is not removed automatically
        }
        $env['PATH_INFO'] = '/'.ltrim($env['PATH_INFO'], '/');

        //The portion of the request URI following the '?'
        $env['QUERY_STRING'] = ($this->request->server->get('QUERY_STRING') !== null) ? $this->request->server->get('QUERY_STRING')
                : '';

        //Name of server host that is running the script
        $env['SERVER_NAME'] = $this->request->server->get('SERVER_NAME');

        //Number of server port that is running the script
        $env['SERVER_PORT'] = $this->request->server->get('SERVER_PORT');

        //Is the application running under HTTPS or HTTP protocol?
        $env['REQUEST_SCHEME'] = $this->request->server->get('REQUEST_SCHEME');

        //Path server
        $env['PATH_SERVER'] = str_replace(basename($this->request->server->get('SCRIPT_FILENAME')), '',
            $this->request->server->get('SCRIPT_FILENAME')); //__FILE__

        //url WebSite
        $env['url_web'] = rtrim($this->request->server->get('HTTP_REFERER'), '/').$env['SCRIPT_NAME'];
        return $env;
    }
}
?>
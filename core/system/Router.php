<?php
namespace Core\system;

/**
 * Router
 * Qui détermine selon le nom de la page, le controller et l'action à appeler
 *
 * @author Thomas
 * @version 1.0.0
*/
class Router
{

	/**
	 * Objet request
	 * @var \Symfony\Component\HttpFoundation\Request
	*/
	protected $request;

    /**
     * Tableau des infos Server, traité
     * @var array
     */
    protected $infoServer;

    /**
     * Constructor
     *
     * @param Core\system\Environment $environment
     */
    public function __construct(\Core\system\Environment $environment)
    {
        $this->request    = $environment->getObjRequest();
        $this->infoServer = $environment->getServer();
    }

	/**
	* Permet de déterminer selon l'url le controller et la méthod à appeler
	* En cas d'echec on appel la page d'erreur
	*
	* Exemple d'url ;
	*   / 					=> Controller par défaut
	*	/tutu/   			=> Controller Tutu.php + méthode par défaut
	*	/tutu-lapin/   		=> Controller Tutu.php + méthode lapin à appeler
	*	/tutu/lapin/ 		=> Controller Tutu.php + arguments
	*
	* @return Array          Retourne les données d'appel du controller ainsi que l'action
	*/
    public function getRoute()
    {
		$route = array(
			"class"        => null,
			"method"        => null,
			"argument"        => null,
		);

		//on récupére les infos URL
        $pattern = '#/?([^/]+)/#';
		preg_match_all($pattern, $this->infoServer['PATH_INFO'], $matches);
        //var_dump($matches);

		//Plusieurs cas, si / controller par défaut
        //si la méthode existe on l'appel
        //sinon 404
        if (empty($matches[1]) === true) {
			//Racine /, controlleur par défaut
            $route['class'] = CONTROLLERNAMESPACE.CONTROLLERDEFAULT;
			$route['method'] = METHODEDEFAULT;

		} elseif (isset($matches[1][0]) === true) {
			//on recupére le controller et la méthode
            $path = explode("-",$matches[1][0]);
			$route['class'] = CONTROLLERNAMESPACE.ucfirst($path[0]);

			if(isset($path[1])) $route['method'] = $path[1];
			else $route['method'] = METHODEDEFAULT;

			if (isset($matches[1][1])) {
				$route['argument'] = $matches[1][1];
			}
		}

		//ensuite on verifie si la classe, et la méthod existe, sinon on affiche la page 404
        if (isset($route['method']) === true && method_exists($route['class'],$route['method']) === false) {
			//Controller / méthode non trouvé
            //404
            $route['class'] = CONTROLLERNAMESPACE.CONTROLLERDEFAULT;
			$route['method'] = 'errorPage';
			$route['argument'] = null;
		}

		return $route;
    }

}
?>
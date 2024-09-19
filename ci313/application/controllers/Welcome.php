<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/userguide3/general/urls.html
	 */
	public function index()
	{
		$this->load->database();
		$this->load->helper('datagrid');
		$settings = new DataGridSettings();
		populateFromRequest($settings, array(
			'table' => 'student',
			'fields' => array("id", "name", "email", "phone", "address", "status", "tc.name as assignName", "birthYear"),
			'searchFields' => array("id", "name", "email", "phone", "address", "tc.name"),
			'joins' => array(
				array(
					'table' => 'teacher',
                    'alias' => 'tc',
                    'type' => 'LEFT',
                    'condition' => 'tc.id = t.teacherId'
				)
			),
			'addFields' => array(
				array(
					'index' => 'name',
					'label' => 'Họ và tên',
				)
			)
		));
		echo '<pre>';
		print_r($settings); die;
		$this->load->view('welcome_message');
	}
}

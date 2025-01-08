<?php
class Auth_Model extends CI_Model
{
    public $tokenInfo;

    public function login($username, $password) {
        // do login, return user info + token
    }

    public function authenticate($token)
    {
        try {
            $this->load->library('JWT');
            $this->tokenInfo = JWT::decode($token, 'SC2lcAAA23!!@C!!^', ['HS256']);
            return array('status' => 200);
        } catch (Exception $e) {
            return array('status' => 401, 'error' => 'Invalid token');
        }
    }

    public function extractToken($header)
    {
        if (!$header) {
            return '';
        }
        $token = explode(' ', $header);
        return isset($token[1]) ? $token[1] : '';
    }
}

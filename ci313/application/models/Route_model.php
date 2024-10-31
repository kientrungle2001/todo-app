<?php
# codeigniter 3 Admin model
class route_model extends CI_Model {
    public function get_by_alias($alias) {
        $this->load->database();
        $this->db->where('alias', $alias);
        $category = $this->db->get('categories')->row();
        if ($category) {
            return array(
                'type' => 'category',
                'category' => $category
            );
        }
        $this->db->where('alias', $alias);
        $news = $this->db->get('news')->row();
        if ($news) {
            return array(
                'type' => 'news',
                'news' => $news
            );
        }
        return null;
    }
}
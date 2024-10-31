<?php
# codeigniter 3 Admin model
class route_model extends CI_Model {
    public function get_by_alias($alias) {
        $this->load->database();
        $this->db->where('alias', $alias)->where('status', 1);
        $category = $this->db->get('categories')->row();
        if ($category) {
            $newsList = $this->db->where('categoryId', $category->id)->get('news')->result_array();
            return array(
                'type' => 'category',
                'category' => $category,
                'newsList' => $newsList
            );
        }
        $this->db->where('alias', $alias);
        $news = $this->db->get('news')->row();
        if ($news) {
            $category = $this->db->where('id', $news->categoryId)->where('status', 1)->get('categories')->row();
            return array(
                'type' => 'news',
                'news' => $news,
                'category' => $category
            );
        }
        return null;
    }
}
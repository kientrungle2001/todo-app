<?php
# codeigniter 3 Admin model
class route_model extends MY_Model {
    public function get_by_alias($alias) {
        $this->db->where('alias', $alias)->where('status', 1);
        $this->applySoftwareAndSiteFilters('categories');
        $category = $this->db->get('categories')->row();
        if ($category) {
			$this->applySoftwareAndSiteFilters('news');
            $newsList = $this->db->where('categoryId', $category->id)->get('news')->result_array();
            return array(
                'type' => 'category',
                'category' => $category,
                'newsList' => $newsList
            );
        }
        $this->db->where('alias', $alias);
        $this->applySoftwareAndSiteFilters('news');
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

    public function document_get_by_alias($alias) {
        $this->db->where('alias', $alias)->where('status', 1);
        $this->applySoftwareAndSiteFilters('categories');
        $category = $this->db->get('categories')->row();
        if ($category) {
			$this->applySoftwareAndSiteFilters('document');
            $documentList = $this->db->where('categoryId', $category->id)->get('document')->result_array();
            return array(
                'type' => 'category',
                'category' => $category,
                'documentList' => $documentList
            );
        }
        $this->db->where('alias', $alias);
        $this->applySoftwareAndSiteFilters('document');
        $document = $this->db->get('document')->row();
        if ($document) {
            $category = $this->db->where('id', $document->categoryId)->where('status', 1)->get('categories')->row();
            return array(
                'type' => 'document',
                'document' => $document,
                'category' => $category
            );
        }
        return null;
    }

    public function course_get_by_alias($alias) {
        $this->db->where('alias', $alias)->where('status', 1);
		$this->applySoftwareAndSiteFilters('courses');
        $course = $this->db->get('courses')->row();
        if ($course) {
			$this->applySoftwareAndSiteFilters('courses_resources');
            $resources = $this->db->where('status', 1)->where('courseId', $course->id)->get('courses_resources')->result_array();
            $others = $this->db->where('status', 1)
            ->where('categoryId', $course->categoryId)
            ->where('id != ', $course->id)
            ->get('courses')->result_array();
            return array(
                'type' => 'course',
                'course' => $course,
                'others' => $others,
                'resources' => $resources
            );
        }
        $this->db->where('status', 1)->where('alias', $alias);
        $resource = $this->db->get('courses_resources')->row();
        if ($resource) {
            $course = $this->db->where('id', $resource->courseId)->where('status', 1)->get('courses')->row();
            $resources = $this->db->where('status', 1)->where('courseId', $course->id)->get('courses_resources')->result_array();
            return array(
                'type' => 'resource',
                'resource' => $resource,
                'resources' => $resources,
                'course' => $course
            );
        }
        return null;
    }
}

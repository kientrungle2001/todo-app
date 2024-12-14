<?php
# codeigniter 3 Admin model
class route_model extends CI_Model {
    public function get_by_alias($alias) {
        $this->load->database();
        $this->db->where('alias', $alias)->where('status', 1);
		$filters = $this->getSoftwareAndSiteFilters('categories');
		foreach ($filters as $field => $value) {
			if ($field === 'software') {
				$this->db->where('software', $value);
			}
			if ($field === 'site') {
				$this->db->where_in('site', $value);
			}
		}
        $category = $this->db->get('categories')->row();
        if ($category) {
			$filters = $this->getSoftwareAndSiteFilters('news');
			foreach ($filters as $field => $value) {
				if ($field === 'software') {
					$this->db->where('software', $value);
				}
				if ($field === 'site') {
					$this->db->where_in('site', $value);
				}
			}
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

    public function course_get_by_alias($alias) {
        $this->load->database();
        $this->db->where('alias', $alias)->where('status', 1);
		$filters = $this->getSoftwareAndSiteFilters('courses');
		foreach ($filters as $field => $value) {
			if ($field === 'software') {
				$this->db->where('software', $value);
			}
			if ($field === 'site') {
				$this->db->where_in('site', $value);
			}
		}
        $course = $this->db->get('courses')->row();
        if ($course) {
			$filters = $this->getSoftwareAndSiteFilters('courses_resources');
			foreach ($filters as $field => $value) {
				if ($field === 'software') {
					$this->db->where('software', $value);
				}
				if ($field === 'site') {
					$this->db->where_in('site', $value);
				}
			}
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

    private function getSoftwareAndSiteFilters($table)
    {
        $software = $this->input->get_request_header('X-Api-Software');
        $site = $this->input->get_request_header('X-Api-Site');
        $filters = array();
        if ($this->isFieldExisted($table, 'software')) {
            $filters['software'] = $software;
        }

        if ($this->isFieldExisted($table, 'site')) {
			$filters['site'] = [$site, 0];
        }
        return $filters;
    }

    private function isFieldExisted($table, $field)
    {
        $query = "DESCRIBE $table";
        $result = $this->db->query($query)->result_array();
        foreach ($result as $row) {
            if ($row['Field'] === $field) {
                return true;
            }
        }
        return false;
    }
}

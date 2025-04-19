<?php
class MY_Model extends CI_Model {
    protected function applySoftwareAndSiteFilters($table) {
        $filters = $this->getSoftwareAndSiteFilters($table);
        foreach ($filters as $field => $value) {
			if ($field === 'software') {
				$this->db->where('software', $value);
			}
			if ($field === 'site') {
				$this->db->where_in('site', $value);
			}
		}
    }

    protected function getSoftwareAndSiteFilters($table)
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

    protected function isFieldExisted($table, $field)
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
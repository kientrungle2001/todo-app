<?php

class DataGridTableJoin {
    public $table;
    public $alias;
    public $type;
    public $condition;
}

class DataGridColumn {
    public $index;
    public $label;
    public $type;
    public $format;
    public $options;
    public $sortable;
    public $actionType;
    public $width;
    public $map;
}

class DataGridFilterColumn {
    public $index;
    public $label;
    public $sqlIndex;
    public $comparisonOperator;
    public $type;
    public $table;
    public $valueField;
    public $labelField;
    public $format;
    public $options;
    public $map;
}

class DataGridSort {
    public $index;
    public $direction;
}

class DataGridSortOption {
    public $index;
    public $label;
    /**
     * @var DataGridSort[]
     */
    public $sorts;
}

class DataGridEditField {
    public $index;
    public $label;
    public $type;
    /**
     * @validate type="number"
     */
    public $size;
    public $options;
    public $map;
    public $table;
    public $valueField;
    public $labelField;
}

class DataGridPagination {
    /**
     * @validate type="number"
     */
    public $page;

    /**
     * @validate type="number"
     */
    public $pageSize;
}

class DataGridSettings {
    public $fields;
    public $searchFields;

    /**
     * @var DataGridTableJoin[]
     */
    public $joins;
    
    /**
     * @var DataGridPagination
     */
    public $pagination; // Đây là đối tượng của class DataGridPagination

    /**
     * @var DataGridColumn[]
     */
    public $columns;
    /**
     * 
     * @var DataGridFilterColumn[]
     */
    public $filters;

    /**
     * @var DataGridSortOption[]
     */
    public $sortOptions;

    /**
     * @var DataGridSort[]
     */
    public $defaultSorts;
    /**
     * @validate type="string"
     */
    public $table;

    /**
     * @var DataGridEditField[]
     */
    public $addFields; // Đây là mảng của các đối tượng DataGridEditField

    /**
     * @var DataGridEditField[]
     */
    public $editFields;

}

function populateFromRequest($object, array $request) {
    $reflection = new ReflectionClass($object);

    foreach ($reflection->getProperties() as $property) {
        $property->setAccessible(true);  // Allow private/protected properties to be accessed
        $name = $property->getName();

        if (array_key_exists($name, $request)) {
            $value = $request[$name];
            $docComment = $property->getDocComment();

            // Extract type from doc comment
            $type = null;
            $isArray = false;
            $validationRules = [];
            if ($docComment) {
                if (preg_match('/@var\s+([\w\\\\]+)(\[\])?/', $docComment, $matches)) {
                    $type = $matches[1];
                    $isArray = isset($matches[2]) && $matches[2] === '[]';
                }

                // Extract validation rules from @validate annotation
                $validationRules = [];
                if (preg_match('/@validate\s+(.+)/', $docComment, $matches)) {
                    $rulesString = $matches[1];
                    parse_str(str_replace(',', '&', $rulesString), $validationRules);
                }
            }

            if ($type && !$isArray) {
                // Handle objects
                if (is_array($value)) {
                    $objectType = $type;
                    $obj = new $objectType();
                    populateFromRequest($obj, $value);
                    validateValue($obj, $validationRules);
                    $property->setValue($object, $obj);
                }
            } elseif ($type && $isArray) {
                // Handle arrays of objects
                if (is_array($value)) {
                    $objectType = $type;
                    $objects = [];

                    foreach ($value as $item) {
                        $obj = new $objectType();
                        populateFromRequest($obj, $item);
                        validateValue($obj, $validationRules);
                        $objects[] = $obj;
                    }

                    $property->setValue($object, $objects);
                }
            } else {
                // Handle primitive types and validation
                validateValue($value, $validationRules);
                $property->setValue($object, $value);
            }
        }
    }
}

function validateValue($value, array $rules) {
    foreach ($rules as $rule => $criteria) {
        if ($rule === 'type') {
            if ($criteria === 'number' && !is_numeric($value)) {
                throw new InvalidArgumentException("Value must be a number");
            } elseif ($criteria === 'email' && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                throw new InvalidArgumentException("Value must be a valid email address");
            }
        } elseif ($rule === 'maxLength') {
            if (strlen($value) > $criteria) {
                throw new InvalidArgumentException("Value must be no more than $criteria characters");
            }
        } elseif ($rule === 'minLength') {
            if (strlen($value) < $criteria) {
                throw new InvalidArgumentException("Value must be at least $criteria characters");
            }
        } elseif ($rule === 'regex') {
            if (!preg_match($criteria, $value)) {
                throw new InvalidArgumentException("Value does not match the required pattern");
            }
        } elseif ($rule === 'enum') {
            if (!in_array($value, $criteria, true)) {
                throw new InvalidArgumentException("Value must be one of: " . implode(', ', $criteria));
            }
        }
    }
}

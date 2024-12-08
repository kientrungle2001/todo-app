<?php
function casting_numeric_fields($items)
{
    foreach ($items as &$item) {
        foreach ($item as $key => $value) {
            if (is_string($value) && strlen($value) < 8 && is_numeric($value)) {
                $item[$key] = floatval($value);
            }
        }
    }
    return $items;
}
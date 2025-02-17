<?php

namespace FLEX_LAYOUT_SYSTEM\Components\Padding;

function padding_options_classes( $attributes ) {
    $class = '';

    // Helper function to sanitize and validate padding values
    $sanitize_padding = function ($value) {
        if (!is_string($value)) {
            return ''; // Handle non-string values
        }
        $value = sanitize_text_field($value); // Sanitize to prevent XSS
        $value = str_replace(' ', '', $value); // Remove spaces
        if (strlen($value) > 20) {
            return ''; // Limit length to prevent excessively long class names
        }
        return $value;
    };

    // Process each padding attribute, using the helper function
    $padding_attributes = [
        'paddingTop', 'paddingRight', 'paddingLeft', 'paddingBottom',
        'paddingPhoneTop', 'paddingPhoneRight', 'paddingPhoneLeft', 'paddingPhoneBottom',
        'paddingTabletPortraitTop', 'paddingTabletPortraitRight', 'paddingTabletPortraitLeft', 'paddingTabletPortraitBottom',
        'paddingTabletLandscapeTop', 'paddingTabletLandscapeRight', 'paddingTabletLandscapeLeft', 'paddingTabletLandscapeBottom',
        'paddingDesktopTop', 'paddingDesktopRight', 'paddingDesktopLeft', 'paddingDesktopBottom',
    ];

    foreach ($padding_attributes as $attribute) {
        if (array_key_exists($attribute, $attributes) && $attributes[$attribute] != 'inherit') {
            $sanitized_value = $sanitize_padding($attributes[$attribute]);
            if (!empty($sanitized_value)) {
                $class .= " {$attribute}-{$sanitized_value} ";
            }
        }
    }

    return $class;
}
<?php

namespace FLEX_LAYOUT_SYSTEM\Components\Margin;

function margin_options_classes( $attributes ) {
    $class = '';

    // Helper function to sanitize and validate margin values
    $sanitize_margin = function ($value) {
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

    // Process each margin attribute, using the helper function
    $margin_attributes = [
        'marginTop', 'marginRight', 'marginLeft', 'marginBottom',
        'marginPhoneTop', 'marginPhoneRight', 'marginPhoneLeft', 'marginPhoneBottom',
        'marginTabletPortraitTop', 'marginTabletPortraitRight', 'marginTabletPortraitLeft', 'marginTabletPortraitBottom',
        'marginTabletLandscapeTop', 'marginTabletLandscapeRight', 'marginTabletLandscapeLeft', 'marginTabletLandscapeBottom',
        'marginDesktopTop', 'marginDesktopRight', 'marginDesktopLeft', 'marginDesktopBottom',
    ];

    foreach ($margin_attributes as $attribute) {
        if (array_key_exists($attribute, $attributes) && $attributes[$attribute] != 'inherit') {
            $sanitized_value = $sanitize_margin($attributes[$attribute]);
            if (!empty($sanitized_value)) {
                $class .= " {$attribute}-{$sanitized_value} ";
            }
        }
    }

    return $class;
}
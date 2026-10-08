// src/components/Button.js
import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

/**
 * Componente Button (Categoría: Acción)
 * Botón interactivo central de U-Found para acciones principales, secundarias y de alerta.
 */
export default function Button({
  label,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  size = 'md',        // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  icon = null,
  style,
  textStyle,
}) {
  const getContainerStyle = (pressed) => {
    const list = [styles.base, styles[`size_${size}`], styles[`variant_${variant}`]];

    if (pressed) {
      list.push(styles[`pressed_${variant}`] || styles.pressedDefault);
    }
    if (disabled || loading) {
      list.push(styles.disabled);
    }
    if (style) {
      list.push(style);
    }
    return list;
  };

  const getTextColor = () => {
    if (variant === 'outline') return colors.primary;
    if (variant === 'secondary') return colors.text;
    if (variant === 'danger') return colors.textInverted;
    return colors.textInverted;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => getContainerStyle(pressed)}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? colors.primary : colors.white}
        />
      ) : (
        <View style={styles.content}>
          {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
          <Text
            style={[
              styles.label,
              styles[`label_${size}`],
              { color: getTextColor() },
              textStyle,
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },

  // Tamaños
  size_sm: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 34,
  },
  size_md: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    minHeight: 44,
  },
  size_lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minHeight: 52,
  },

  // Variantes
  variant_primary: {
    backgroundColor: colors.primary,
  },
  variant_secondary: {
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  variant_outline: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  variant_danger: {
    backgroundColor: colors.danger,
  },

  // Pressed states
  pressed_primary: {
    backgroundColor: colors.primaryDark,
    opacity: 0.9,
  },
  pressed_secondary: {
    backgroundColor: colors.surfaceHover,
  },
  pressed_outline: {
    backgroundColor: colors.primarySurface,
  },
  pressed_danger: {
    opacity: 0.85,
  },
  pressedDefault: {
    opacity: 0.8,
  },

  disabled: {
    opacity: 0.5,
  },

  // Etiquetas
  label: {
    fontWeight: fontWeight.semiBold,
  },
  label_sm: {
    fontSize: fontSize.xs,
  },
  label_md: {
    fontSize: fontSize.sm,
  },
  label_lg: {
    fontSize: fontSize.md,
  },
});

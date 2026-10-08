// src/components/CategoryChip.js
import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

/**
 * Componente CategoryChip (Categoría: Acción)
 * Chip seleccionable utilizado para filtrar objetos por categorías del campus universitario.
 */
export default function CategoryChip({
  label,
  icon = null,
  selected = false,
  onPress,
  count = null,
  style,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.chipSelected : styles.chipUnselected,
        pressed && styles.chipPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
      <Text
        style={[
          styles.label,
          selected ? styles.labelSelected : styles.labelUnselected,
        ]}
      >
        {label}
      </Text>
      {count !== null ? (
        <View
          style={[
            styles.badge,
            selected ? styles.badgeSelected : styles.badgeUnselected,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              selected ? styles.badgeTextSelected : styles.badgeTextUnselected,
            ]}
          >
            {count}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: spacing.sm,
    minHeight: 34,
  },
  chipUnselected: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipPressed: {
    opacity: 0.75,
  },
  iconContainer: {
    marginRight: spacing.xs,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  labelUnselected: {
    color: colors.textSecondary,
  },
  labelSelected: {
    color: colors.textInverted,
    fontWeight: fontWeight.semiBold,
  },
  badge: {
    marginLeft: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: radius.full,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeUnselected: {
    backgroundColor: colors.surfaceHover,
  },
  badgeSelected: {
    backgroundColor: colors.primaryDark,
  },
  badgeText: {
    fontSize: fontSize.xxs,
    fontWeight: fontWeight.bold,
  },
  badgeTextUnselected: {
    color: colors.textSecondary,
  },
  badgeTextSelected: {
    color: colors.textInverted,
  },
});

// src/components/StatusBadge.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

/**
 * Componente StatusBadge (Categoría: Contenedor o Dato)
 * Indicador visual del estado del reporte ("Perdido", "Encontrado", "Devuelto").
 */
export default function StatusBadge({
  status = 'perdido', // 'perdido' | 'encontrado' | 'devuelto'
  label = null,
  size = 'md',        // 'sm' | 'md'
  style,
}) {
  const normalizedStatus = status.toLowerCase();

  const getStatusConfig = () => {
    switch (normalizedStatus) {
      case 'encontrado':
        return {
          defaultLabel: 'Encontrado',
          dotColor: colors.primary,
          bg: colors.statusFoundBg,
          text: colors.statusFoundText,
          border: colors.statusFoundBorder,
        };
      case 'devuelto':
        return {
          defaultLabel: 'Devuelto',
          dotColor: colors.secondary,
          bg: colors.statusReturnedBg,
          text: colors.statusReturnedText,
          border: colors.statusReturnedBorder,
        };
      case 'perdido':
      default:
        return {
          defaultLabel: 'Perdido',
          dotColor: colors.danger,
          bg: colors.statusLostBg,
          text: colors.statusLostText,
          border: colors.statusLostBorder,
        };
    }
  };

  const config = getStatusConfig();
  const displayLabel = label || config.defaultLabel;

  return (
    <View
      style={[
        styles.badge,
        styles[`size_${size}`],
        { backgroundColor: config.bg, borderColor: config.border },
        style,
      ]}
      accessibilityRole="text"
    >
      <View style={[styles.dot, { backgroundColor: config.dotColor }]} />
      <Text style={[styles.text, styles[`text_${size}`], { color: config.text }]}>
        {displayLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: radius.full,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    marginRight: spacing.xs,
  },
  text: {
    fontWeight: fontWeight.semiBold,
  },

  // Tamaños
  size_sm: {
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
  },
  size_md: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },

  text_sm: {
    fontSize: fontSize.xxs,
  },
  text_md: {
    fontSize: fontSize.xs,
  },
});

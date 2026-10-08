// src/components/ItemCard.js
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing, shadows } from '../theme';
import StatusBadge from './StatusBadge';

/**
 * Componente ItemCard (Categoría: Contenedor o Dato)
 * Tarjeta interactiva del feed que resume un objeto reportado en el campus universitario.
 */
export default function ItemCard({
  title,
  description,
  location,
  date,
  category,
  status = 'perdido',
  imageUrl = null,
  emoji = '📦',
  onPress,
  style,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        style,
      ]}
      accessibilityRole="button"
    >
      <View style={styles.topRow}>
        <StatusBadge status={status} size="sm" />
        {date ? <Text style={styles.dateText}>{date}</Text> : null}
      </View>

      <View style={styles.bodyRow}>
        {/* Imagen del objeto o placeholder visual universitario */}
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.emojiText}>{emoji}</Text>
            </View>
          )}
        </View>

        {/* Información del objeto */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {description ? (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          ) : null}

          {/* Ubicación en el campus */}
          {location ? (
            <View style={styles.metaRow}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.locationText} numberOfLines={1}>
                {location}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Pie de tarjeta con etiqueta de categoría */}
      {category ? (
        <View style={styles.footerRow}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{category}</Text>
          </View>
          <Text style={styles.actionPrompt}>Ver detalles →</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardPressed: {
    opacity: 0.85,
    borderColor: colors.primary,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dateText: {
    fontSize: fontSize.xxs,
    color: colors.textMuted,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: 68,
    height: 68,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surfaceSubtle,
    marginRight: spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySurface,
  },
  emojiText: {
    fontSize: fontSize.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xxs,
  },
  description: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    lineHeight: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: fontSize.xxs,
    marginRight: spacing.xxs,
  },
  locationText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  categoryTag: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.xs,
  },
  categoryTagText: {
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  actionPrompt: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: fontWeight.semiBold,
  },
});

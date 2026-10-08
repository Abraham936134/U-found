// src/viewer/CatalogScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { CATALOG } from './catalog';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';
import CategoryChip from '../components/CategoryChip';

const CATEGORIES = ['Todas', 'Acción', 'Entrada', 'Contenedor o Dato'];

export default function CatalogScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredComponents = CATALOG.filter((item) => {
    if (selectedCategory === 'Todas') return true;
    return item.category === selectedCategory;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <View style={styles.badgeTop}>
            <Text style={styles.badgeTopText}>LAB-02 • URP</Text>
          </View>
          <Text style={styles.title}>Catálogo de Componentes</Text>
          <Text style={styles.subtitle}>
            Librería Core y Sistema de Diseño para U-Found
          </Text>
        </View>

        {/* Filtros de Categoría */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              selected={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>

        {/* Lista de Componentes */}
        <View style={styles.list}>
          {filteredComponents.map((item) => {
            const DemoComponent = item.Demo;
            return (
              <View key={item.name} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.componentName}>{item.name}</Text>
                    <Text style={styles.categoryBadge}>{item.category}</Text>
                  </View>
                  <View style={styles.authorTag}>
                    <Text style={styles.authorTagText}>👤 {item.author}</Text>
                  </View>
                </View>

                <Text style={styles.description}>{item.description}</Text>

                <View style={styles.eventInfo}>
                  <Text style={styles.eventLabel}>⚡ Eventos:</Text>
                  <Text style={styles.eventValue}>{item.eventHandled}</Text>
                </View>

                <View style={styles.demoWrapper}>
                  <Text style={styles.demoHeader}>DEMO INTERACTIVO</Text>
                  <DemoComponent />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  badgeTop: {
    backgroundColor: colors.primarySurface,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.full,
    marginBottom: spacing.xs,
  },
  badgeTopText: {
    fontSize: fontSize.xxs,
    fontWeight: fontWeight.bold,
    color: colors.primaryDark,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extraBold,
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  filtersScroll: {
    marginTop: spacing.sm,
  },
  filtersContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  list: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    gap: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  componentName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  categoryBadge: {
    fontSize: fontSize.xxs,
    color: colors.primaryDark,
    fontWeight: fontWeight.semiBold,
    marginTop: spacing.xxs,
  },
  authorTag: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.xs,
  },
  authorTagText: {
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  description: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  eventLabel: {
    fontSize: fontSize.xxs,
    fontWeight: fontWeight.bold,
    color: colors.textMuted,
  },
  eventValue: {
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
    borderRadius: radius.xs,
  },
  demoWrapper: {
    marginTop: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  demoHeader: {
    fontSize: fontSize.xxs,
    fontWeight: fontWeight.bold,
    color: colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
});

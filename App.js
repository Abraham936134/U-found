// App.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, StatusBar } from 'react-native';
import CatalogScreen from './src/viewer/CatalogScreen';
import FeedScreen from './src/screens/FeedScreen';
import { colors, fontSize, fontWeight, radius, spacing } from './src/theme';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'app'

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Selector de Vistas: Catálogo (Lab 02) vs Pantalla Real (U-Found) */}
      <View style={styles.navBar}>
        <Pressable
          onPress={() => setActiveTab('catalog')}
          style={[styles.navTab, activeTab === 'catalog' && styles.navTabActive]}
        >
          <Text
            style={[
              styles.navTabText,
              activeTab === 'catalog' && styles.navTabTextActive,
            ]}
          >
            📋 Catálogo Lab 02
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('app')}
          style={[styles.navTab, activeTab === 'app' && styles.navTabActive]}
        >
          <Text
            style={[
              styles.navTabText,
              activeTab === 'app' && styles.navTabTextActive,
            ]}
          >
            📱 App U-Found (Feed Real)
          </Text>
        </Pressable>
      </View>

      {/* Contenido de la Pantalla Activa */}
      <View style={styles.screenContainer}>
        {activeTab === 'catalog' ? <CatalogScreen /> : <FeedScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    gap: spacing.sm,
  },
  navTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  navTabActive: {
    backgroundColor: colors.primarySurface,
  },
  navTabText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semiBold,
    color: colors.textSecondary,
  },
  navTabTextActive: {
    color: colors.primaryDark,
    fontWeight: fontWeight.bold,
  },
  screenContainer: {
    flex: 1,
  },
});

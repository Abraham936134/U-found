// src/components/SearchInput.js
import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSize, radius, spacing } from '../theme';

/**
 * Componente SearchInput (Categoría: Entrada)
 * Entrada controlada de texto especializada en la búsqueda y filtrado de reportes universitarios.
 */
export default function SearchInput({
  value,
  onChangeText,
  placeholder = 'Buscar objeto, aula, pabellón...',
  onClear,
  onSubmitEditing,
  style,
  inputStyle,
}) {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChangeText) {
      onChangeText('');
    }
  };

  const hasText = Boolean(value && value.length > 0);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, inputStyle]}
        returnKeyType="search"
        onSubmitEditing={onSubmitEditing}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {hasText ? (
        <Pressable
          onPress={handleClear}
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.clearButtonPressed,
          ]}
          accessibilityLabel="Limpiar búsqueda"
          accessibilityRole="button"
        >
          <Text style={styles.clearIcon}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 46,
  },
  searchIcon: {
    fontSize: fontSize.sm,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  clearButton: {
    padding: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceHover,
    marginLeft: spacing.xs,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonPressed: {
    opacity: 0.7,
  },
  clearIcon: {
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

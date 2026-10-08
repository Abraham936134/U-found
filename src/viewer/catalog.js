// src/viewer/catalog.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';
import Button from '../components/Button';
import CategoryChip from '../components/CategoryChip';
import SearchInput from '../components/SearchInput';
import PinInput from '../components/PinInput';
import StatusBadge from '../components/StatusBadge';
import ItemCard from '../components/ItemCard';
import EmptyState from '../components/EmptyState';

// ==========================================
// DEMOS INTERACTIVOS (CON ESTADO PROPIO)
// ==========================================

function ButtonDemo() {
  const [clickCount, setClickCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <View style={demoStyles.container}>
      <Text style={demoStyles.helperText}>
        Contador de clicks: <Text style={demoStyles.bold}>{clickCount}</Text>
      </Text>
      <View style={demoStyles.row}>
        <Button
          label="Botón Primario"
          variant="primary"
          onPress={() => setClickCount((prev) => prev + 1)}
          style={demoStyles.flex1}
        />
        <Button
          label="Secundario"
          variant="secondary"
          onPress={() => setClickCount(0)}
          style={demoStyles.flex1}
        />
      </View>
      <View style={demoStyles.row}>
        <Button
          label="Contorno"
          variant="outline"
          onPress={() => setClickCount((prev) => prev + 2)}
          style={demoStyles.flex1}
        />
        <Button
          label={loading ? 'Cargando...' : 'Probar Loading'}
          variant="primary"
          loading={loading}
          onPress={handleLoadingDemo}
          style={demoStyles.flex1}
        />
      </View>
    </View>
  );
}

function CategoryChipDemo() {
  const [selectedCategory, setSelectedCategory] = useState('Electrónica');

  const categories = [
    { id: 'Todos', label: 'Todos', count: 12 },
    { id: 'Electrónica', label: 'Electrónica', count: 5 },
    { id: 'Documentos', label: 'Documentos/Carnet', count: 3 },
    { id: 'Cuadernos', label: 'Cuadernos', count: 4 },
  ];

  return (
    <View style={demoStyles.container}>
      <Text style={demoStyles.helperText}>
        Categoría seleccionada:{' '}
        <Text style={demoStyles.bold}>{selectedCategory}</Text>
      </Text>
      <View style={demoStyles.wrapRow}>
        {categories.map((cat) => (
          <CategoryChip
            key={cat.id}
            label={cat.label}
            count={cat.count}
            selected={selectedCategory === cat.id}
            onPress={() => setSelectedCategory(cat.id)}
            style={demoStyles.chipMargin}
          />
        ))}
      </View>
    </View>
  );
}

function SearchInputDemo() {
  const [query, setQuery] = useState('');

  return (
    <View style={demoStyles.container}>
      <SearchInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar llaves, carnet, calculadora..."
        onClear={() => setQuery('')}
      />
      <Text style={demoStyles.helperText}>
        Valor actual:{' '}
        <Text style={demoStyles.bold}>
          {query ? `"${query}"` : '(vacío - escribe algo)'}
        </Text>
      </Text>
    </View>
  );
}

function PinInputDemo() {
  const [pin, setPin] = useState('');
  const [verifiedMessage, setVerifiedMessage] = useState('');

  const handleComplete = (code) => {
    if (code === '2026') {
      setVerifiedMessage('✅ ¡PIN 2026 Válido! Entrega confirmada con éxito.');
    } else {
      setVerifiedMessage(`ℹ️ PIN ingresado: ${code} (Prueba con "2026")`);
    }
  };

  return (
    <View style={demoStyles.container}>
      <Text style={demoStyles.helperText}>
        Ingresa el código OTP de 4 dígitos para validar la entrega:
      </Text>
      <PinInput
        value={pin}
        onChangeText={(val) => {
          setPin(val);
          if (val.length < 4) setVerifiedMessage('');
        }}
        onComplete={handleComplete}
      />
      {verifiedMessage ? (
        <Text style={demoStyles.successText}>{verifiedMessage}</Text>
      ) : null}
      <View style={demoStyles.centerRow}>
        <Button
          label="Limpiar PIN"
          size="sm"
          variant="secondary"
          onPress={() => {
            setPin('');
            setVerifiedMessage('');
          }}
        />
      </View>
    </View>
  );
}

function StatusBadgeDemo() {
  return (
    <View style={demoStyles.container}>
      <View style={demoStyles.row}>
        <StatusBadge status="perdido" size="md" />
        <StatusBadge status="encontrado" size="md" />
        <StatusBadge status="devuelto" size="md" />
      </View>
      <View style={[demoStyles.row, { marginTop: spacing.sm }]}>
        <StatusBadge status="perdido" size="sm" label="Extraviado (Personalizado)" />
        <StatusBadge status="encontrado" size="sm" />
      </View>
    </View>
  );
}

function ItemCardDemo() {
  const [lastAction, setLastAction] = useState('Ninguna');

  return (
    <View style={demoStyles.container}>
      <Text style={demoStyles.helperText}>
        Última tarjeta presionada:{' '}
        <Text style={demoStyles.bold}>{lastAction}</Text>
      </Text>
      <ItemCard
        title="Calculadora Casio fx-991LAX"
        description="Olvidada en mesa de la segunda fila durante la clase de Cálculo."
        location="Pabellón B - Aula 204"
        date="Hace 15 minutos"
        category="Electrónica"
        status="encontrado"
        emoji="🧮"
        onPress={() => setLastAction('Calculadora Casio (Encontrado)')}
      />
      <ItemCard
        title="Carnet de Biblioteca URP"
        description="A nombre de alumno de Ing. Informática, encontrado en cafetería central."
        location="Cafetería Central - Terraza"
        date="Hoy, 9:20 AM"
        category="Documentos"
        status="perdido"
        emoji="🪪"
        onPress={() => setLastAction('Carnet URP (Perdido)')}
      />
    </View>
  );
}

function EmptyStateDemo() {
  const [resetCount, setResetCount] = useState(0);

  return (
    <View style={demoStyles.container}>
      <EmptyState
        title="No se encontraron coincidencias"
        message="No hay publicaciones activas con esos filtros en el campus."
        emoji="🔎"
        actionLabel={`Restablecer filtros (${resetCount})`}
        onAction={() => setResetCount((c) => c + 1)}
      />
    </View>
  );
}

// ==========================================
// CATALOG DEFINITION
// ==========================================

export const CATALOG = [
  {
    name: 'Button',
    category: 'Acción',
    author: 'Abraham Delgado',
    description:
      'Botón versátil con 4 variantes de color (primary, secondary, outline, danger), soporte táctil activo, estado loading y disabled.',
    eventHandled: 'onPress',
    Demo: ButtonDemo,
  },
  {
    name: 'CategoryChip',
    category: 'Acción',
    author: 'Héctor Galicia',
    description:
      'Chip interactivo para filtrado rápido por categorías del campus (Electrónica, Documentos, Ropa) con contador y estado seleccionado.',
    eventHandled: 'onPress',
    Demo: CategoryChipDemo,
  },
  {
    name: 'SearchInput',
    category: 'Entrada',
    author: 'Héctor Galicia',
    description:
      'Campo de texto controlado con icono de búsqueda, botón de limpieza instantánea y vinculación directa al estado del padre.',
    eventHandled: 'onChangeText, onClear',
    Demo: SearchInputDemo,
  },
  {
    name: 'PinInput',
    category: 'Entrada',
    author: 'Abraham Delgado',
    description:
      'Entrada controlada OTP de 4 casillas numéricas para la entrega física segura antifraude. Notifica al completar los 4 dígitos.',
    eventHandled: 'onChangeText, onComplete',
    Demo: PinInputDemo,
  },
  {
    name: 'StatusBadge',
    category: 'Contenedor o Dato',
    author: 'Julio Vega',
    description:
      'Etiqueta visual de estado con punto indicador y colores semánticos de U-Found (Perdido, Encontrado, Devuelto).',
    eventHandled: 'N/A (Visual/Dato)',
    Demo: StatusBadgeDemo,
  },
  {
    name: 'ItemCard',
    category: 'Contenedor o Dato',
    author: 'Julio Vega',
    description:
      'Tarjeta principal del feed universitario que agrupa estado, título, ubicación dentro del campus, categoría y acción al presionar.',
    eventHandled: 'onPress',
    Demo: ItemCardDemo,
  },
  {
    name: 'EmptyState',
    category: 'Contenedor o Dato',
    author: 'Héctor Galicia / Julio Vega',
    description:
      'Contenedor para vistas vacías o búsquedas sin resultado, con ilustración temática y botón de acción interactivo.',
    eventHandled: 'onAction',
    Demo: EmptyStateDemo,
  },
];

const demoStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  helperText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  bold: {
    fontWeight: fontWeight.bold,
    color: colors.primaryDark,
  },
  successText: {
    fontSize: fontSize.xs,
    color: colors.primaryDark,
    fontWeight: fontWeight.semiBold,
    textAlign: 'center',
    marginVertical: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chipMargin: {
    marginBottom: spacing.xs,
  },
  flex1: {
    flex: 1,
  },
});

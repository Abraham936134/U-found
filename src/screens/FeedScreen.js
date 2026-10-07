// src/screens/FeedScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import {
  Button,
  CategoryChip,
  SearchInput,
  PinInput,
  StatusBadge,
  ItemCard,
  EmptyState,
} from '../components';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

// Datos iniciales de prueba representativos del campus URP
const INITIAL_ITEMS = [
  {
    id: '1',
    title: 'Calculadora Casio fx-991LAX',
    description: 'Dejada en la segunda fila del aula de Física 1, junto al proyector.',
    location: 'Pabellón B - Aula 204',
    date: 'Hace 25 min',
    category: 'Electrónica',
    status: 'encontrado',
    emoji: '🧮',
    otp: '4821', // PIN de entrega para prueba
  },
  {
    id: '2',
    title: 'Carnet Universitario URP',
    description: 'Perteneciente a la Facultad de Ingeniería. Encontrado cerca a torniquetes.',
    location: 'Entrada Principal - Puerta 1',
    date: 'Hoy, 10:15 AM',
    category: 'Documentos',
    status: 'encontrado',
    emoji: '🪪',
    otp: '1234',
  },
  {
    id: '3',
    title: 'Mochila Negra Vans',
    description: 'Contiene cuadernos de Cálculo y estuche azul. Por favor avisar con urgencia.',
    location: 'Cafetería Central - Terraza',
    date: 'Ayer, 4:30 PM',
    category: 'Mochilas',
    status: 'perdido',
    emoji: '🎒',
    otp: '7790',
  },
  {
    id: '4',
    title: 'Audífonos Sony WH-CH520',
    description: 'Color crema, olvidados en una de las cabinas de estudio grupal.',
    location: 'Biblioteca Central - Piso 2',
    date: 'Hoy, 8:40 AM',
    category: 'Electrónica',
    status: 'perdido',
    emoji: '🎧',
    otp: '5561',
  },
  {
    id: '5',
    title: 'Casaca Impermeable Azul',
    description: 'Talla M, colgada en el respaldo de una silla.',
    location: 'Laboratorio de Cómputo L-03',
    date: 'Hace 2 horas',
    category: 'Ropa',
    status: 'encontrado',
    emoji: '🧥',
    otp: '3312',
  },
];

const CATEGORIES = [
  { id: 'Todas', label: 'Todas' },
  { id: 'Electrónica', label: 'Electrónica' },
  { id: 'Documentos', label: 'Documentos' },
  { id: 'Mochilas', label: 'Mochilas' },
  { id: 'Ropa', label: 'Ropa' },
];

export default function FeedScreen() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [statusFilter, setStatusFilter] = useState('todos'); // 'todos' | 'perdido' | 'encontrado'

  // Modal para Entrega Segura con PIN OTP
  const [selectedItemForClaim, setSelectedItemForClaim] = useState(null);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Filtrado de objetos
  const filteredItems = items.filter((item) => {
    // Filtro por texto
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro por categoría
    const matchesCategory =
      selectedCategory === 'Todas' || item.category === selectedCategory;

    // Filtro por estado
    const matchesStatus =
      statusFilter === 'todos' || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenClaimModal = (item) => {
    setSelectedItemForClaim(item);
    setEnteredPin('');
    setPinError(false);
  };

  const handleVerifyOtp = (pinToTest) => {
    const pin = pinToTest || enteredPin;
    if (!selectedItemForClaim) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (pin === selectedItemForClaim.otp || pin === '0000') {
        // Éxito: cambiar estado a 'devuelto'
        setItems((prev) =>
          prev.map((it) =>
            it.id === selectedItemForClaim.id
              ? { ...it, status: 'devuelto' }
              : it
          )
        );
        Alert.alert(
          '🎉 ¡Entrega Exitosa!',
          `El PIN coincide. Se ha formalizado la devolución de: "${selectedItemForClaim.title}".`
        );
        setSelectedItemForClaim(null);
      } else {
        setPinError(true);
        Alert.alert(
          'Código Incorrecto',
          `El PIN ingresado no coincide con el código del dueño (Tip demo: el PIN de este objeto es ${selectedItemForClaim.otp}).`
        );
      }
    }, 600);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Barra Superior con Identidad U-Found */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brandTitle}>U-Found 📍</Text>
          <Text style={styles.campusTag}>Campus Universidad Ricardo Palma</Text>
        </View>
        <StatusBadge status="encontrado" label="Comunidad Activa" size="sm" />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Barra de Búsqueda Controlada */}
        <View style={styles.searchSection}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar por objeto, aula o pabellón..."
            onClear={() => setSearchQuery('')}
          />
        </View>

        {/* Filtros de Estado */}
        <View style={styles.statusFiltersRow}>
          <Button
            label="Todos"
            size="sm"
            variant={statusFilter === 'todos' ? 'primary' : 'secondary'}
            onPress={() => setStatusFilter('todos')}
            style={styles.filterBtn}
          />
          <Button
            label="Perdidos"
            size="sm"
            variant={statusFilter === 'perdido' ? 'danger' : 'secondary'}
            onPress={() => setStatusFilter('perdido')}
            style={styles.filterBtn}
          />
          <Button
            label="Encontrados"
            size="sm"
            variant={statusFilter === 'encontrado' ? 'primary' : 'secondary'}
            onPress={() => setStatusFilter('encontrado')}
            style={styles.filterBtn}
          />
        </View>

        {/* Chips de Categorías */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat.id}
              label={cat.label}
              selected={selectedCategory === cat.id}
              onPress={() => setSelectedCategory(cat.id)}
            />
          ))}
        </ScrollView>

        {/* Lista de Reportes o Estado Vacío */}
        <View style={styles.feedList}>
          <View style={styles.listHeader}>
            <Text style={styles.listSectionTitle}>
              Reportes recientes ({filteredItems.length})
            </Text>
            {searchQuery || selectedCategory !== 'Todas' || statusFilter !== 'todos' ? (
              <Button
                label="Limpiar filtros"
                variant="outline"
                size="sm"
                onPress={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todas');
                  setStatusFilter('todos');
                }}
              />
            ) : null}
          </View>

          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                title={item.title}
                description={item.description}
                location={item.location}
                date={item.date}
                category={item.category}
                status={item.status}
                emoji={item.emoji}
                onPress={() => handleOpenClaimModal(item)}
              />
            ))
          ) : (
            <EmptyState
              title="No encontramos coincidencias"
              message={`No hay objetos reportados que coincidan con tus criterios de búsqueda.`}
              emoji="🔎"
              actionLabel="Restablecer filtros"
              onAction={() => {
                setSearchQuery('');
                setSelectedCategory('Todas');
                setStatusFilter('todos');
              }}
            />
          )}
        </View>
      </ScrollView>

      {/* Modal de Entrega Segura mediante PIN OTP */}
      <Modal
        visible={selectedItemForClaim !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedItemForClaim(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🔐 Entrega Segura (OTP)</Text>
              <StatusBadge status={selectedItemForClaim?.status || 'encontrado'} size="sm" />
            </View>

            <Text style={styles.modalSubtitle}>
              Objeto:{' '}
              <Text style={styles.boldText}>{selectedItemForClaim?.title}</Text>
            </Text>
            <Text style={styles.modalDescription}>
              Para concretar la entrega física del objeto, solicita al dueño que te indique su código de 4 dígitos e ingrésalo aquí:
            </Text>

            <PinInput
              value={enteredPin}
              onChangeText={(code) => {
                setEnteredPin(code);
                setPinError(false);
              }}
              onComplete={(code) => handleVerifyOtp(code)}
              error={pinError}
            />

            <Text style={styles.pinHint}>
              💡 PIN para probar en el demo: {selectedItemForClaim?.otp}
            </Text>

            <View style={styles.modalActions}>
              <Button
                label="Cancelar"
                variant="secondary"
                onPress={() => setSelectedItemForClaim(null)}
                style={styles.modalBtn}
              />
              <Button
                label={isVerifying ? 'Verificando...' : 'Confirmar Entrega'}
                variant="primary"
                loading={isVerifying}
                disabled={enteredPin.length < 4}
                onPress={() => handleVerifyOtp(enteredPin)}
                style={styles.modalBtn}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  brandTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.extraBold,
    color: colors.primaryDark,
    letterSpacing: -0.5,
  },
  campusTag: {
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  searchSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  statusFiltersRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  filterBtn: {
    flex: 1,
  },
  categoriesScroll: {
    marginTop: spacing.sm,
  },
  categoriesContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  feedList: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  listSectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },

  // Modal OTP Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  modalSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  boldText: {
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  modalDescription: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  pinHint: {
    fontSize: fontSize.xxs,
    color: colors.textMuted,
    textAlign: 'center',
    marginVertical: spacing.xs,
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  modalBtn: {
    flex: 1,
  },
});

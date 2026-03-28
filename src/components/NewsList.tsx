import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import NewsItem from '../../src/components/NewsItem';
import { fetchNewsService, NewsData } from '../../src/utils/handle-api';

export default function NewsList() {
  const [newsList, setNewsList] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await fetchNewsService();
      setNewsList(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao obter notícias');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: NewsData }) => (
    <NewsItem
      title={item.title}
      image={item.image}
      published={item.published}
      link={item.link}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhuma notícia encontrada.</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <View>
          <Text>
            {newsList.length} {'notícias'}
          </Text>
        </View>
      </View>
      <View style={styles.headerRight}>
        <Button
          title={loading ? 'Atualizando...' : 'Atualizar'}
          onPress={fetchNews}
          disabled={loading}
          color="#007AFF"
        />
      </View>
    </View>
  );

  if (loading && newsList.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.fullscreenCenter}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Carregando notícias...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && newsList.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.fullscreenCenter}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Algo deu errado</Text>
          <Text style={styles.errorText}>{error}</Text>
          <View style={styles.retryButton}>
            <Button title="Tentar novamente" onPress={fetchNews} color="#FF3B30" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={newsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  fullscreenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#555',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  errorText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    width: 200,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  headerLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A2E',
    letterSpacing: 0.3,
  },
  badgeContainer: {
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  headerRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 15,
    color: '#AAAAAA',
  },
});

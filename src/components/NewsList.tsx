import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import NewsItem from '../../src/components/NewsItem';

import { fetchNewsService, NewsData } from '../../src/utils/handle-api';

export default function NewsList() {
  const [newsList, setNewsList] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);
  
  
// type
//   data == export interface NewsData {
//   id: number;
//   title: string;
//   summary: string;
//   link: string;
//   published: string;
//   image?: string | null;
//      }


  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await fetchNewsService();
      setNewsList(data);
    } catch (err: any) {
      setError(err.message || "Erro ao obter notícias");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({


  })



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Carregando notícias...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Erro: {error}</Text>
        </View>
      ) : (


        <ScrollView contentContainerStyle={styles.scrollContent}>
          {newsList.map((item) => (
            <NewsItem
              key={item.id.toString()}
              title={item.title}
              image={item.image}
              published={item.published}
              link={item.link}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    paddingTop: 40, // Ensure header is spaced from exact top
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
  },
});

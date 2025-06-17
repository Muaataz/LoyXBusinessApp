import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function StaticPage({navigation}: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            style={styles.backButton}>
            <Image
              source={require('../assets/image/backButton.png')}
              resizeMode="contain"
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Image
              source={require('../assets/image/LoyX.png')}
              resizeMode="contain"
              style={{width: 100, height: 30}}
            />
            <Text style={styles.sectionTitle}>Customer privacy policy</Text>
            <Text style={styles.paragraph}>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut alUt enim ad minima veniam,
              quis nostrum exercitationem ullam corporis suscipit laboriosam,
              nisi ut al
            </Text>

            <Text style={styles.sectionTitle}>Terms</Text>
            <Text style={styles.paragraph}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance.
            </Text>
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <SafeAreaView style={styles.bottomContainer}>
          <TouchableOpacity style={styles.acceptButton} activeOpacity={0.8}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height: Platform.OS === 'ios' ? 44 : 56,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backButton: {
    // padding: 8,
  },
  logo: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 26,
    color: '#222222',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6A6A6A',
    fontWeight: '400',
    marginBottom: 16,
  },
  bottomContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    padding: 16,
  },
  acceptButton: {
    backgroundColor: '#222222',
    borderRadius: 100,
    height: 55,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

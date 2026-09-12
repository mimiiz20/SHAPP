import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

export default function Index() {
  // ============================================================
  // ANIMAÇÕES
  // ============================================================

  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(-1)).current;

  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(1.08)).current;

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(40)).current;

  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.9)).current;

  const [transitioning, setTransitioning] = useState(false);

  // ============================================================
  // ANIMAÇÃO INICIAL
  // ============================================================

  useEffect(() => {
    // ------------------------------------------------------------
    // IMAGEM
    // ------------------------------------------------------------

    Animated.parallel([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(imageScale, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // ------------------------------------------------------------
    // LOGO
    // ------------------------------------------------------------

    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.15,
          duration: 700,
          easing: Easing.out(Easing.back(1.7)),
          useNativeDriver: true,
        }),

        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(logoRotate, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // ------------------------------------------------------------
    // TEXTO
    // ------------------------------------------------------------

    Animated.sequence([
      Animated.delay(400),

      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(contentTranslate, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // ------------------------------------------------------------
    // BOTÃO
    // ------------------------------------------------------------

    Animated.sequence([
      Animated.delay(700),

      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.spring(buttonScale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // ============================================================
  // ROTAÇÃO DA LOGO
  // ============================================================

  const logoRotation = logoRotate.interpolate({
    inputRange: [-1, 0],
    outputRange: ['-360deg', '0deg'],
  });

  // ============================================================
  // BOTÃO CONTINUAR
  // ============================================================

  const entrarNoApp = () => {
    if (transitioning) {
      return;
    }

    setTransitioning(true);

    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1.3,
        duration: 400,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 400,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(imageScale, {
        toValue: 1.12,
        duration: 500,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 350,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 350,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/introducao');
    });
  };

  // ============================================================
  // INTERFACE
  // ============================================================

  return (
    <View style={styles.container}>

      {/* ========================================================
          IMAGEM DE FUNDO
      ======================================================== */}

      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: imageOpacity,
            transform: [
              {
                scale: imageScale,
              },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/images/Inicio.png')}
          style={styles.backgroundImage}
        />
      </Animated.View>

      {/* ========================================================
          GRADIENTES
      ======================================================== */}

      <View style={styles.gradientContainer}>

        {/* ------------------------------------------------------
            AZUL / MARINHO
        ------------------------------------------------------ */}

        <LinearGradient
          colors={[
            'rgba(48, 54, 77, 0.70)',
            'rgba(48, 54, 77, 0.38)',
            'rgba(48, 54, 77, 0.15)',
            'rgba(48, 54, 77, 0.48)',
          ]}
          locations={[0, 0.28, 0.58, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.blueGradient}
          pointerEvents="none"
        />

        {/* ------------------------------------------------------
            AMARELO
        ------------------------------------------------------ */}

        <LinearGradient
          colors={[
            'rgba(240, 208, 96, 0.55)',
            'rgba(240, 208, 96, 0.25)',
            'rgba(240, 208, 96, 0.08)',
            'rgba(240, 208, 96, 0)',
          ]}
          locations={[0, 0.25, 0.50, 0.80]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0.75 }}
          style={styles.yellowGradient}
          pointerEvents="none"
        />

        {/* ------------------------------------------------------
            GRADIENTE ESCURO INFERIOR
        ------------------------------------------------------ */}

        <LinearGradient
          colors={[
            'rgba(48, 54, 77, 0)',
            'rgba(48, 54, 77, 0.08)',
            'rgba(48, 54, 77, 0.40)',
            'rgba(48, 54, 77, 0.78)',
            'rgba(48, 54, 77, 0.98)',
          ]}
          locations={[0, 0.30, 0.52, 0.72, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.bottomGradient}
          pointerEvents="none"
        />

      </View>

      {/* ========================================================
          LOGO
      ======================================================== */}

      <Animated.View
        style={[
          styles.logoCorner,
          {
            opacity: logoOpacity,
            transform: [
              {
                scale: logoScale,
              },
              {
                rotate: logoRotation,
              },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.logo}
        />
      </Animated.View>

      {/* ========================================================
          CONTEÚDO
      ======================================================== */}

      <View style={styles.content}>

        {/* ======================================================
            TEXTO
        ====================================================== */}

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: contentOpacity,
              transform: [
                {
                  translateY: contentTranslate,
                },
              ],
            },
          ]}
        >
          <Text style={styles.welcome}>
            Bem-vindo(a)!
          </Text>

          <Text style={styles.title}>
            SUNNY HEALTH
          </Text>

          <View style={styles.titleLine} />

          <Text style={styles.description}>
            Tecnologia e cuidado para acompanhar
            sua saúde de forma simples,
            tranquila e acessível.
          </Text>
        </Animated.View>

        {/* ======================================================
            BOTÃO
        ====================================================== */}

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonOpacity,
              transform: [
                {
                  scale: buttonScale,
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={entrarNoApp}
            disabled={transitioning}
          >
            <Text style={styles.buttonText}>
              CONTINUAR
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </View>

    </View>
  );
}

// =================================================================
// ESTILOS
// =================================================================

const styles = StyleSheet.create({

  // ===============================================================
  // TELA PRINCIPAL
  // ===============================================================

  container: {
    flex: 1,
    backgroundColor: '#30364D',
    overflow: 'hidden',
  },

  // ===============================================================
  // IMAGEM DE FUNDO
  // ===============================================================

  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // ===============================================================
  // CONTAINER DOS GRADIENTES
  // ===============================================================

  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },

  // ===============================================================
  // GRADIENTE AZUL
  // ===============================================================

  blueGradient: {
    ...StyleSheet.absoluteFillObject,
  },

  // ===============================================================
  // GRADIENTE AMARELO
  // ===============================================================

  yellowGradient: {
    ...StyleSheet.absoluteFillObject,
  },

  // ===============================================================
  // GRADIENTE INFERIOR
  // ===============================================================

  bottomGradient: {
    ...StyleSheet.absoluteFillObject,
  },

  // ===============================================================
  // LOGO
  // ===============================================================

  logoCorner: {
    position: 'absolute',
    top: 30,
    right: -20,
    width: 165,
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },

  logo: {
    width: 155,
    height: 155,
    resizeMode: 'contain',
  },

  // ===============================================================
  // CONTEÚDO
  // ===============================================================

  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    paddingHorizontal: 28,

    // AUMENTADO PARA SUBIR O CONTEÚDO
    paddingBottom: 90,

    alignItems: 'center',
    zIndex: 10,
  },

  // ===============================================================
  // CONTAINER DO TEXTO
  // ===============================================================

  textContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 8,

    // DIMINUÍDO PARA APROXIMAR O BOTÃO
    marginBottom: 28,
  },

  // ===============================================================
  // BEM-VINDO
  // ===============================================================

  welcome: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.3,

    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 5,
  },

  // ===============================================================
  // SUNNY HEALTH
  // ===============================================================

  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#FFE88A',
    textAlign: 'center',
    letterSpacing: 1.5,
    marginTop: 6,

    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 4,
  },

  // ===============================================================
  // LINHA
  // ===============================================================

  titleLine: {
    width: 80,
    height: 4,
    borderRadius: 10,

    backgroundColor: '#FFE88A',

    marginTop: 14,
    marginBottom: 18,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 3,
  },

  // ===============================================================
  // DESCRIÇÃO
  // ===============================================================

  description: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    maxWidth: 350,

    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 5,
  },

  // ===============================================================
  // BOTÃO
  // ===============================================================

  buttonContainer: {
    width: '100%',
  },

  button: {
    width: '100%',
    height: 62,
    borderRadius: 18,

    backgroundColor: '#F0D060',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#30364D',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,

    elevation: 8,
  },

  buttonText: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#fcfcfc',
  },

});
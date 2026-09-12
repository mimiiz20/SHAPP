import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRef, useState, useEffect } from 'react';

export default function Relogio() {
  // ============================================================
  // 🔵 BLUETOOTH - FUTURO
  // ============================================================
  // A conexão Bluetooth será implementada aqui futuramente.
  //
  // Quando formos implementar:
  // 1. Verificar se o Bluetooth está ligado
  // 2. Procurar o ESP32
  // 3. Identificar a pulseira correta
  // 4. Conectar
  // 5. Descobrir os serviços e características
  // 6. Receber dados de BPM, tremor etc.
  //
  // NÃO COLOCAR O BLE AQUI AGORA.
  // ============================================================

  const [status, setStatus] = useState('idle');

  const pulse = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  // ============================================================
  // 🌊 ONDAS - FUTURO VISUAL
  // ============================================================

  const arc1 = useRef(new Animated.Value(0)).current;
  const arc2 = useRef(new Animated.Value(0)).current;
  const arc3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateArc = (animation, delay, duration = 6500) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animation, {
            toValue: 1,
            duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = animateArc(arc1, 0);
    const animation2 = animateArc(arc2, 1200);
    const animation3 = animateArc(arc3, 2400);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, []);

  const moveArc1 = arc1.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 25],
  });

  const moveArc2 = arc2.interpolate({
    inputRange: [0, 1],
    outputRange: [25, -30],
  });

  const moveArc3 = arc3.interpolate({
    inputRange: [0, 1],
    outputRange: [-15, 35],
  });

  // ============================================================
  // ANIMAÇÃO DA PULSEIRA
  // ============================================================

  const iniciarAnimacao = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const pararAnimacao = () => {
    pulse.stopAnimation();

    Animated.spring(pulse, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  // ============================================================
  // 🔵 BLUETOOTH - FUTURO
  // ============================================================
  // Esta função atualmente NÃO faz uma conexão Bluetooth.
  //
  // Ela serve apenas para deixar a tela preparada para quando
  // a comunicação com o ESP32 for implementada.
  // ============================================================

  const conectarPulseira = () => {
    if (status === 'connecting' || status === 'connected') {
      return;
    }

    setStatus('connecting');
    iniciarAnimacao();

    // ==========================================================
    // 🔵 BLUETOOTH - FUTURO
    // ==========================================================
    // A lógica real de Bluetooth entrará aqui futuramente.
    //
    // NÃO adicionar o código BLE agora.
    // ==========================================================

    setTimeout(() => {
      pararAnimacao();
      setStatus('idle');
    }, 500);
  };

  // ============================================================
  // PULAR CONEXÃO
  // ============================================================

  const pularConexao = () => {
    router.push('/home');
  };

  // ============================================================
  // CONTINUAR APÓS CONEXÃO
  // ============================================================

  const continuar = () => {
    router.push('/home');
  };

  return (
    <View style={styles.container}>

      {/* ======================================================
          FUNDO
          ====================================================== */}

      <LinearGradient
        colors={[
          '#899EEB',
          '#AAB9EF',
          '#C8CFED',
          '#E3E1D2',
          '#FFF5B8',
        ]}
        locations={[0, 0.25, 0.52, 0.78, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* ======================================================
          🌊 ONDAS ANIMADAS
          ====================================================== */}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.arc,
          styles.arcOne,
          {
            transform: [
              {
                translateX: moveArc1,
              },
            ],
          },
        ]}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.arc,
          styles.arcTwo,
          {
            transform: [
              {
                translateX: moveArc2,
              },
            ],
          },
        ]}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.arc,
          styles.arcThree,
          {
            transform: [
              {
                translateX: moveArc3,
              },
            ],
          },
        ]}
      />

      {/* ======================================================
          CONTEÚDO
          ====================================================== */}

      <View style={styles.content}>

        {/* ====================================================
            TÍTULO
            ==================================================== */}

        <Text style={styles.title}>
          VAMOS CONECTAR
        </Text>

        <Text style={styles.title}>
          SUA PULSEIRA
        </Text>

        {/* ====================================================
            ÍCONE DA PULSEIRA
            ==================================================== */}

        <Animated.View
          style={[
            styles.watchContainer,
            {
              transform: [{ scale: pulse }],
            },
          ]}
        >
          <View
            style={[
              styles.watchCircle,
              status === 'connected' &&
                styles.watchCircleConnected,
            ]}
          >
            <Ionicons
              name="watch-outline"
              size={90}
              color={
                status === 'connected'
                  ? '#FFFFFF'
                  : '#30364D'
              }
            />
          </View>

          {status === 'connected' && (
            <View style={styles.checkCircle}>
              <Ionicons
                name="checkmark"
                size={28}
                color="#FFFFFF"
              />
            </View>
          )}
        </Animated.View>

        {/* ====================================================
            INSTRUÇÃO
            ==================================================== */}

        <Text style={styles.instruction}>
          {status === 'idle' &&
            'Agora vamos conectar sua pulseira ao Sunny-Health.'}

          {status === 'connecting' &&
            'A conexão Bluetooth será configurada posteriormente.'}

          {status === 'connected' &&
            'Tudo certo! Sua pulseira está conectada.'}
        </Text>

        {/* ====================================================
            PASSOS
            ==================================================== */}

        {status !== 'connected' && (
          <View style={styles.stepsContainer}>

            <View style={styles.step}>
              <View style={styles.numberCircle}>
                <Text style={styles.number}>1</Text>
              </View>

              <Text style={styles.stepText}>
                Deixe a pulseira perto do seu celular.
              </Text>
            </View>

            <View style={styles.step}>
              <View style={styles.numberCircle}>
                <Text style={styles.number}>2</Text>
              </View>

              <Text style={styles.stepText}>
                Toque em "Conectar pulseira".
              </Text>
            </View>

            <View
              style={[
                styles.step,
                {
                  marginBottom: 0,
                },
              ]}
            >
              <View style={styles.numberCircle}>
                <Text style={styles.number}>3</Text>
              </View>

              <Text style={styles.stepText}>
                Aguarde a configuração da conexão.
              </Text>
            </View>

          </View>
        )}

        {/* ====================================================
            STATUS
            ==================================================== */}

        <View
          style={[
            styles.statusContainer,
            status === 'connected' &&
              styles.statusContainerConnected,
          ]}
        >
          <View
            style={[
              styles.statusDot,
              status === 'connecting' &&
                styles.statusDotConnecting,
              status === 'connected' &&
                styles.statusDotConnected,
            ]}
          />

          <Text style={styles.statusText}>
            {status === 'idle' &&
              'Bluetooth ainda não configurado'}

            {status === 'connecting' &&
              'Bluetooth será configurado depois'}

            {status === 'connected' &&
              'Pulseira conectada'}
          </Text>
        </View>

        {/* ====================================================
            BOTÕES
            ==================================================== */}

        {status !== 'connected' ? (
          <>
            <TouchableOpacity
              style={[
                styles.connectButton,
                status === 'connecting' &&
                  styles.connectButtonConnecting,
              ]}
              activeOpacity={0.85}
              onPress={conectarPulseira}
              disabled={status === 'connecting'}
            >
              <Ionicons
                name={
                  status === 'connecting'
                    ? 'bluetooth'
                    : 'bluetooth-outline'
                }
                size={27}
                color="#FFFFFF"
              />

              <Text style={styles.connectButtonText}>
                CONECTAR PULSEIRA
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipButton}
              activeOpacity={0.75}
              onPress={pularConexao}
            >
              <Text style={styles.skipButtonText}>
                PULAR POR ENQUANTO
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Animated.View
            style={{
              width: '100%',
              transform: [{ scale }],
            }}
          >
            <TouchableOpacity
              style={styles.continueButton}
              activeOpacity={0.85}
              onPress={continuar}
            >
              <Text style={styles.continueButtonText}>
                CONTINUAR
              </Text>

              <Ionicons
                name="arrow-forward"
                size={25}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </Animated.View>
        )}

      </View>

      {/* ======================================================
          🔵 PAGINAÇÃO
          Página 2 de 3
          Fica FIXA no fundo da tela
          ====================================================== */}

      <View
        pointerEvents="none"
        style={styles.pagination}
      >
        <View style={styles.paginationDot} />

        <View
          style={[
            styles.paginationDot,
            styles.paginationDotActive,
          ]}
        />

        <View style={styles.paginationDot} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  // ============================================================
  // CONTAINER
  // ============================================================

  container: {
    flex: 1,
    overflow: 'hidden',
  },

  // ============================================================
  // 🌊 ONDAS
  // ============================================================

  arc: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.20)',
    borderRadius: 300,
  },

  arcOne: {
    width: 480,
    height: 480,
    top: -210,
    right: -180,
  },

  arcTwo: {
    width: 390,
    height: 390,
    top: 180,
    left: -230,
    borderColor: 'rgba(255,255,255,0.14)',
  },

  arcThree: {
    width: 600,
    height: 600,
    bottom: -350,
    right: -280,
    borderColor: 'rgba(255,255,255,0.17)',
  },

  // ============================================================
  // CONTEÚDO
  // ============================================================

  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 65,
    paddingBottom: 85,
  },

  // ============================================================
  // TÍTULO
  // ============================================================

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 42,
  },

  // ============================================================
  // PULSEIRA
  // ============================================================

  watchContainer: {
    marginTop: 25,
    marginBottom: 20,
    position: 'relative',
  },

  watchCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.82)',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#30364D',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  watchCircleConnected: {
    backgroundColor: '#55B878',
  },

  checkCircle: {
    position: 'absolute',
    right: -5,
    bottom: 0,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#55B878',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },

  // ============================================================
  // INSTRUÇÃO
  // ============================================================

  instruction: {
    fontSize: 19,
    lineHeight: 27,
    color: '#30364D',
    textAlign: 'center',
    fontWeight: '500',
    maxWidth: 360,
    marginBottom: 20,
  },

  // ============================================================
  // PASSOS
  // ============================================================

  stepsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.70)',
    borderRadius: 18,
    padding: 17,
    marginBottom: 17,
  },

  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  numberCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#899EEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  number: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  stepText: {
    flex: 1,
    color: '#30364D',
    fontSize: 16,
    lineHeight: 21,
  },

  // ============================================================
  // STATUS
  // ============================================================

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },

  statusContainerConnected: {
    marginTop: 5,
  },

  statusDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#F0D060',
    marginRight: 9,
  },

  statusDotConnecting: {
    backgroundColor: '#899EEB',
  },

  statusDotConnected: {
    backgroundColor: '#55B878',
  },

  statusText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#30364D',
  },

  // ============================================================
  // BOTÃO BLUETOOTH - FUTURO
  // ============================================================

  connectButton: {
    width: '100%',
    height: 67,
    borderRadius: 18,
    backgroundColor: '#F0D060',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,

    shadowColor: '#30364D',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  connectButtonConnecting: {
    backgroundColor: '#899EEB',
  },

  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // ============================================================
  // BOTÃO PULAR
  // ============================================================

  skipButton: {
    marginTop: 13,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  skipButtonText: {
    color: '#30364D',
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
    letterSpacing: 0.3,
  },

  // ============================================================
  // BOTÃO CONTINUAR
  // ============================================================

  continueButton: {
    width: '100%',
    height: 67,
    borderRadius: 18,
    backgroundColor: '#55B878',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,

    shadowColor: '#30364D',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.7,
  },

  // ============================================================
  // PAGINAÇÃO
  // ============================================================

  pagination: {
    position: 'absolute',
    bottom: 28,
    left: 0,
    right: 0,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
  },

  paginationDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },

  paginationDotActive: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
});
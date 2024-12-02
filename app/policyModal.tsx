import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

export default function PolicyModal() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const { theme } = useTheme();

  const privacyPolicyContent = `
Última atualização: [01/12/2024]

1. Informações que coletamos
Coletamos informações que você nos fornece diretamente ao usar o aplicativo, incluindo [listar pontos de dados específicos].

2. Como usamos suas informações
Usamos as informações coletadas para:
- Fornecer e manter nossos serviços
- Melhorar a experiência do usuário
- Envie notificações importantes

3. Segurança de dados
Implementamos medidas de segurança adequadas para proteger as suas informações pessoais.

4. Contate-nos
Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco em [informações de contato]
`;

  const termsContent = `
Última atualização: [01/12/2024]

1. Aceitação dos Termos
Ao acessar e usar este aplicativo, você aceita e concorda em ficar vinculado a estes Termos e Condições.

2. Licença de uso
É concedida permissão para baixar temporariamente uma cópia do aplicativo apenas para uso pessoal e não comercial.

3. Isenção de responsabilidade
O aplicativo é fornecido "como está", sem quaisquer garantias, expressas ou implícitas.

4. Limitações
Em nenhum caso seremos responsáveis ​​por quaisquer danos decorrentes do uso ou incapacidade de uso do aplicativo.

5. Alterações nos Termos
Reservamo-nos o direito de modificar estes termos a qualquer momento. Por favor, revise-os periodicamente.
`;

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.content}>
        <Text style={[styles.text, { color: theme.text.primary }]}>
          {type === 'privacy' ? privacyPolicyContent : termsContent}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 
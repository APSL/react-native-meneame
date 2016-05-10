import {
  defaultRouteMapper,
  titleRouteMapperGenerator,
  CenteredText
} from 'react-native-navigator-wrapper'

export default function mnmRouteMapper () {
  return {
    ...defaultRouteMapper(),
    ...titleRouteMapperGenerator(CenteredText, {color: '#d35400', fontSize: 18})
  }
}

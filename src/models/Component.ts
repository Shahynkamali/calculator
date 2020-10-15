import { ConvertedUnitAndValue } from '@/types/index';
import roundNumberUp from '@/utils/roundNumberUp';
import EventService from './EventService';
import Attributes from './Attributes';
// eslint-disable-next-line
const convert = require('convert-units');


interface IngredientProps {
  componentName?: string;
  desiredVolume?: NumberWithUnitProps;
  desiredConcentration?: NumberWithUnitProps;
  initConcentration?: NumberWithUnitProps;
  amountToPut?: NumberWithUnitProps;
}

interface NumberWithUnitProps {
  value: number;
  unit: string;
}

class Component {
  public events: EventService = new EventService();

  public attributes: Attributes<IngredientProps>;

  constructor(attrs: IngredientProps) {
    this.attributes = new Attributes(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: IngredientProps): void {
    this.attributes.set(update);
    this.trigger('change');
  }

  private calculateAmountToPut(): NumberWithUnitProps | undefined {
    return this.isIngredientLiquid
      ? this.calculateAmountToPutForLiquidIngredient()
      : this.calculateAmountToPutForSolidIngredient();
  }

  private calculateAmountToPutForLiquidIngredient(): NumberWithUnitProps | undefined {
    const initConcentration = this.get('initConcentration');
    const desiredConcentration = this.get('desiredConcentration');
    const desiredVolume = this.get('desiredVolume');

    if (desiredVolume && initConcentration && desiredConcentration) {
      const convertedInitConcentrationVal = convert(initConcentration?.value).from(initConcentration?.unit).to(desiredConcentration?.unit);
      const ratio = desiredConcentration.value / convertedInitConcentrationVal;
      const amountToPutVal = ratio * desiredVolume.value;
      const bestUnitAndValue: ConvertedUnitAndValue = this.convertToBestPossibleOutCome(amountToPutVal, desiredVolume.unit);
      const amountToPut: NumberWithUnitProps = {
        value: roundNumberUp(bestUnitAndValue.val),
        unit: bestUnitAndValue.unit,
      };
      this.set({ amountToPut });
    }

    return undefined;
  }

  private calculateAmountToPutForSolidIngredient(): NumberWithUnitProps | undefined {
    const desiredConcentration = this.get('desiredConcentration');
    const desiredVolume = this.get('desiredVolume');
    if (desiredVolume && desiredConcentration) {
      const convertedDesiredVolume = convert(desiredVolume.value).from(desiredVolume.unit).to('mL');
      const amountToPutValue = (desiredConcentration.value * convertedDesiredVolume) / 100;
      const bestUnitAndValue: ConvertedUnitAndValue = this.convertToBestPossibleOutCome(amountToPutValue, 'g');
      const amountToPut = {
        value: roundNumberUp(bestUnitAndValue.val),
        unit: bestUnitAndValue.unit,
      };

      this.set({ amountToPut });
    }
    return undefined;
  }

  private convertToBestPossibleOutCome(value: number, unit: string) {
    return convert(value).from(unit).toBest(
      { exclude: ['mm3', 'cm3', 'cl', 'dl', 'kl', 'krm', 'tsk', 'msk', 'kkp', 'glas', 'kanna', 'm3', 'kg'] },
    );
  }

  get isIngredientLiquid(): boolean {
    return true;
  }
}

export default Component;

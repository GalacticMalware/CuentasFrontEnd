import { Purchase } from '../../interfaces/initial';

export class ShoppingData {
  formatData(data: any): Array<Purchase> {
    let dataFormat: Array<Purchase> = [];

    if (data.length) {
      data.map((x: Purchase) => {
        const c = this.colorAssignment(x.typePurchase);
        dataFormat.push(
          Object.assign(x, { color: c.color }, { textColor: c.textColor })
        );
      });
    } else {
      const c = this.colorAssignment(data.typePurchase);
      dataFormat.push(
        Object.assign(data, { color: c.color }, { textColor: c.textColor })
      );
    }

    return dataFormat;
  }

  colorAssignment(x: string) {
    let color: string = '',
      textColor: string = '';
    switch (x) {
      case 'Restaurante':
        color = 'bg-blue-100';
        textColor = 'text-blue-500';
        break;
      case 'Super':
        color = 'bg-cyan-100';
        textColor = 'text-cyan-500';
        break;
      case 'Retiro':
        color = 'bg-purple-100';
        textColor = 'text-purple-500';
        break;
      case 'Farmacia':
        color = 'bg-orange-100';
        textColor = 'text-orange-500';
        break;
    }
    return { color, textColor };
  }
}

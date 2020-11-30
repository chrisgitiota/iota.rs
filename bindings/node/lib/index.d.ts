export declare interface NodeInfo {
  name: string
  version: string
  isHealthy: boolean
  coordinatorPublicKey: string
  latestMilestoneMessageId: string
  latestMilestoneIndex: number
  solidMilestoneMessageId: string
  solidMilestoneIndex: number
  pruningIndex: number
  features: string[]
}

export declare interface Message {
  network_id: number
  parent1: string
  parent2: string
  payload?: any
  nonce: number
}

export declare interface MessageMetadata {
  messageId: string
  parent1MessageId: string
  parent2MessageId: string
  isSolid: boolean
  shouldPromote?: boolean
  shouldReattach?: boolean
  referencedByMilestoneIndex?: number
  ledgerInclusionState?: string
}

export declare interface OutputMetadata {
  messageId: string
  transactionId: string
  outputIndex: number
  isSpent: boolean
  address: Address
  amount: number
}

export declare interface MilestoneMetadata {
  milestoneIndex: number
  messageId: string
  timestamp: number
}

export declare interface BrokerOptions {
  automaticDisconnect: boolean
  // timeout in milliseconds
  timeout: number
}

export declare interface Address {
  type: 'Wots' | 'Ed25519'
  data: string
}

export declare interface AddressBalance {
  address: Address,
  balance: number
}

export declare class ClientBuilder {
  node(url: string): ClientBuilder
  nodes(urls: string[]): ClientBuilder
  quorumSize(size: number): ClientBuilder
  quorumThreshold(threshold: number): ClientBuilder
  brokerOptions(options: BrokerOptions): ClientBuilder
  build(): Client
}

export declare class ValueTransactionSender {
  path(bip32path: string): ValueTransactionSender
  index(index: number): ValueTransactionSender
  output(address: string, value: number): ValueTransactionSender
  submit(): Promise<string>
}

export declare class UnspentAddressGetter {
  path(bip32path: string): UnspentAddressGetter
  index(index: number): UnspentAddressGetter
  get(): Promise<[Address, number]>
}

export declare class AddressFinder {
  path(bip32path: string): AddressFinder
  range(start: number, end: number): AddressFinder
  get(): Address[]
}

export declare class BalanceGetter {
  path(bip32path: string): BalanceGetter
  index(index: number): BalanceGetter
  get(): Promise<number>
}

export declare class Client {
  subscriber(): TopicSubscriber
  send(seed: string): ValueTransactionSender
  getUnspentAddress(seed: string): UnspentAddressGetter
  findAddresses(seed: string): AddressFinder
  findMessages(indexationKeys: string[], messageIds: string[]): Promise<Message[]>
  getBalance(seed: string): BalanceGetter
  getAddressBalances(addresses: string[]): Promise<AddressBalance[]>
  retry(messageId: string): Promise<Message>

  getInfo(): Promise<NodeInfo>
  getTips(): Promise<[string, string]>
  postMessage(message: Message): Promise<string>
  getMessage(): MessageFinder
  getOutput(outputId: string): Promise<OutputMetadata>
  findOutputs(outputIds: string[], addresses: string[]): Promise<OutputMetadata[]>
  getAddressOutputs(address: string): Promise<string[]>
  getAddressBalance(address: string): Promise<number>
  getMilestone(index: number): Promise<MilestoneMetadata>
  reattach(messageId: string): Promise<Message>
  promote(messageId: string): Promise<Message>
}

export declare class MessageFinder {
  index(index: string): Promise<string[]>
  data(messageId: string): Promise<Message>
  raw(messageId: string): Promise<string>
  children(messageId: string): Promise<string[]>
  metadata(messageId: string): Promise<MessageMetadata>
}

export declare type Callback = (err: any, data: any) => void

export declare class TopicSubscriber {
  topic(topic: string): TopicSubscriber
  topics(topic: string[]): TopicSubscriber
  subscribe(cb: Callback): TopicSubscriber
  unsubscribe(cb: Callback): TopicSubscriber
}
